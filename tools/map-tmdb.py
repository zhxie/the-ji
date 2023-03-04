import csv
import json
import requests
import os
import sys


def parseInt(s):
    try:
        return int(s)
    except:
        return 0


def parseFloat(s):
    try:
        return float(s)
    except:
        return 0


def main():
    if len(sys.argv) <= 2:
        print(
            f'Please specify API key and CSV with "python3 {sys.argv[0]} <API_KEY> <PATH>".'
        )
        return

    jijis = []
    with open(sys.argv[2], "r") as f:
        # Skip the header line.
        next(f)
        r = csv.reader(f)
        for row in r:
            id = row[0]
            if not id.isdecimal():
                continue
            title = row[2]
            year = row[4]
            reviewDate = row[8]
            firstImpression = row[11]
            overallFeeling = row[12]
            story = row[13]
            character = row[14]
            director = row[15]
            performance = row[16]
            visual = row[17]
            art = row[18]
            editing = row[19]
            sound = row[20]
            music = row[21]
            rating = row[24]
            if parseFloat(rating) == 0:
                continue
            jijis.append(
                {
                    "id": int(id),
                    "title": title,
                    "year": year,
                    "rating": float(rating),
                    "reviews": [
                        {
                            "review_date": reviewDate,
                            "rating": float(rating),
                            "scores": {
                                "firstImpression": parseInt(firstImpression),
                                "review": parseInt(overallFeeling),
                                "story": parseInt(story),
                                "character": parseInt(character),
                                "directing": parseInt(director),
                                "acting": parseInt(performance),
                                "picture": parseInt(visual),
                                "art": parseInt(art),
                                "editing": parseInt(editing),
                                "sound": parseInt(sound),
                                "music": parseInt(music),
                            },
                        }
                    ],
                }
            )
    print(f"Parse {len(jijis)} films")

    details = []
    multiple_choices = []
    fuzzy = []
    no_result = []
    no_title = []
    for jiji in jijis:
        if jiji["title"] != "":
            res = requests.get(
                f"https://api.themoviedb.org/3/search/movie?api_key={sys.argv[1]}&query={jiji['title']}"
            )
            # Filter the same title and the same year.
            filtered1 = [
                m
                for m in res.json()["results"]
                if m["release_date"].startswith(jiji["year"])
            ]
            filtered2 = [
                m for m in filtered1 if m["title"].lower() == jiji["title"].lower()
            ]
            tmdb = None
            if len(filtered2) > 0:
                tmdb = filtered2[0]
                if len(filtered2) > 1:
                    multiple_choices.append(jiji["id"])
            elif len(filtered1) > 0:
                tmdb = filtered1[0]
                fuzzy.append(jiji["id"])

            if tmdb is not None:
                details.append(
                    {
                        "id": jiji["id"],
                        "tmdb": tmdb["id"],
                        "title": tmdb["title"],
                        "original_title": tmdb["original_title"],
                        "image": f"https://image.tmdb.org/t/p/original{tmdb['poster_path']}",
                        "language": tmdb["original_language"],
                        "release_date": tmdb["release_date"],
                        "rating": jiji["rating"],
                        "reviews": jiji["reviews"],
                    }
                )
            else:
                no_result.append(jiji["id"])
        else:
            no_title.append(jiji["id"])

    films = []
    # Export films.
    os.makedirs("data/films", exist_ok=True)
    for detail in details:
        with open(f"data/films/{detail['id']}.json", "w") as f:
            json.dump(detail, f, ensure_ascii=False, indent=2)
            f.write("\n")
            films.append(
                {
                    "id": detail["id"],
                    "thumbnail": detail["image"].replace("/original/", "/w500/"),
                    "rating": detail["rating"],
                    "last_review_date": detail["reviews"][0]["review_date"],
                }
            )
    # Export film-list.
    with open(f"data/film-list.json", "w") as f:
        json.dump({"films": films}, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f'Map {len(details)} films with TMDB to "tmdb.json".')
    if len(multiple_choices) > 0:
        print("The following films have multiple choices:")
        print(", ".join(str(id) for id in multiple_choices))
    if len(fuzzy) > 0:
        print("The following films do not match their titles exactly:")
        print(", ".join(str(id) for id in fuzzy))
    if len(no_result) > 0:
        print("The following films have no result:")
        print(", ".join(str(id) for id in no_result))
    if len(no_title) > 0:
        print("The following films have no title:")
        print(", ".join(str(id) for id in no_title))


if __name__ == "__main__":
    main()
