import pathlib as PATH
from time import sleep
import io
import json
from urllib.request import urlopen
from urllib.parse import urlparse, urlencode, parse_qs
import pyperclip

zzzapiurl = 'https://public-operation-nap-sg.hoyoverse.com/common/gacha_record/api/getGachaLog'
genshinapiurl = "https://public-operation-hk4e-sg.hoyoverse.com/gacha_info/api/getGachaLog"
zzzwebviewurl = 'https://gs.hoyoverse.com/nap/event/e20230424gacha/index.html'
genshinwebviewurl = 'https://gs.hoyoverse.com/genshin/event/e20190909gacha-v3/index.html'
zzzpath = "C:/Program Files/HoYoPlay/games/ZenlessZoneZero Game/ZenlessZoneZero_Data/webCaches/2.27.0.0/Cache/Cache_Data/data_2"
genshinpath = "C:/Program Files/HoYoPlay/games/Genshin Impact game/GenshinImpact_Data/webCaches/2.28.0.0/Cache/Cache_Data/data_2"

cachefile = PATH.WindowsPath(zzzpath)
webviewurl = zzzwebviewurl
apiurl = zzzapiurl

gachatypes = {
    "standart": None,
    "event": 2001,
    "weapon": None,
    "bangboo": None
}
realgachatypes = {
    "standart": 1,
    "event": 2,
    "weapon": 3,
    "bangboo": 5
}
params = {
    "authkey_ver": 1,
    "sign_type": 2,
    "auth_appid": "",
    "win_mode": "",
    "gacha_id": "",
    "timestamp": "",
    "init_log_gacha_type": "",
    "init_log_gacha_base_type": "",
    "ui_layout": "",
    "button_mode": "",
    "plat_type": 3,
    "authkey": "",
    "lang": "en",
    "region": "prod_gf_eu",
    "game_biz": "nap_global",
    "page": "",
    "size": "",
    "gacha_type": "",
    "real_gacha_type": "",
    "end_id": ""
}
errorcodes = {
    "-502": None,
    "-1": "authkey timeout"
}

with io.open(str(cachefile), mode='r', encoding='latin-1') as cache:
    cachevalue = cache.read()


def extract_wishlink_from_str(wishlinkstartindex):
    wishlinkendindex = cachevalue.find("\0", wishlinkstartindex)
    return cachevalue[wishlinkstartindex:wishlinkendindex]


def find_all_links():
    wishlinkindex = cachevalue.find(webviewurl)
    if wishlinkindex == -1:
        raise RuntimeError("Link doesn't exist in the cache file! Reopen the wishing tab and try again.")
    links = []
    while wishlinkindex != -1:
        link = extract_wishlink_from_str(wishlinkindex)
        if (link not in links):
            links.append(link)
        wishlinkindex = cachevalue.find(webviewurl, wishlinkindex+1)
    print(f"\nFound {len(links)} wishlinks\n")
    return links


def test_fetch(link):
    linkparams = parse_qs(urlparse(link).query)
    game_biz, authkey = linkparams['game_biz'][0], linkparams['authkey'][0]
    params["authkey"] = authkey
    params["size"] = 1
    params["real_gacha_type"] = 5
    params["game_biz"] = game_biz
    emptyparams = []
    for key in params:
        if not params[key]:
            emptyparams.append(key)
    for key in emptyparams:
        params.pop(key)
    # for i in range(100):
    #     params["real_gacha_type"] = i
    #     requesturl = '{}?{}'.format(zzzapiurl, urlencode(params))
    #     with urlopen(requesturl) as request:
    #         result = request.read()
    #         result = json.loads(result)
    #     if len(result["data"]["list"]) != 0:
    #         print(result["data"]["list"][0]["gacha_type"])
    #     else:
    #         print(i, " :no data")
    #     sleep(0.3)
    requesturl = '{}?{}'.format(apiurl, urlencode(params))
    print("\n"+requesturl+"\n")
    with urlopen(requesturl) as request:
        result = request.read()
        result = json.loads(result)
    return result
    
def main():
    allwishlinks = find_all_links()
    print(allwishlinks[-1])
    # for ak in allwishlinks:
    #     print(len(ak))
    pyperclip.copy(allwishlinks[-1])
    print("\nLatest wishlink in the array copied to clipboard\n")
    wishlink = allwishlinks[-1]
    print("Type 'y' to try and fetch 1 last pull\n\n")
    fetchbool = input()
    if fetchbool != "y":
        return
    print(test_fetch(wishlink))
    
    
# wish_url = urlparse(wish_url)
# wish_url_params = parse_qs(wish_url.query)
# regionvalue, authkeyvalue = wish_url_params['game_biz'][0], wish_url_params['authkey'][0]

# gacha_types = {
#     1: 'standart_banner', 
#     11: 'event_banner', 
#     12: 'weapon_banner'
# }

# params = {
#     'lang': 'en',
#     'authkey': authkeyvalue,
#     'authkey_ver': 1,
#     'size': 20,
#     'game_biz': regionvalue,
# }
# def get_wishes_data(url, param):
#     with urlopen('{}?{}'.format(url, urlencode(param))) as request:
#         result = request.read()
#     result = json.loads(result)
#     return result['data']


# def fetch_banner_wishes(banner_type):
#     new_wish_dataset = []
#     page = 0
#     params['gacha_type'] = banner_type
#     while (wish_data := get_wishes_data(api_url, params)) and len(wish_data['list']) > 0:
#         for wish in wish_data['list']:
#             new_wish_dataset_entry = {}
#             new_wish_dataset_entry['uid'] = int(wish['uid'])
#             new_wish_dataset_entry['gacha_id'] = int(wish['gacha_id'])
#             new_wish_dataset_entry['gacha_type'] = int(wish['gacha_type'])
#             new_wish_dataset_entry['item_id'] = int(wish['item_id'])
#             new_wish_dataset_entry['count'] = int(wish['count'])
#             new_wish_dataset_entry['time'] = wish['time']
#             new_wish_dataset_entry['name'] = wish['name']
#             new_wish_dataset_entry['lang'] = wish['lang']
#             new_wish_dataset_entry['item_type'] = wish['item_type']
#             new_wish_dataset_entry['rank_type'] = int(wish['rank_type'])
#             new_wish_dataset_entry['id'] = int(wish['id'])
#             new_wish_dataset.append(new_wish_dataset_entry)
#             end_id = wish['id']
#         page += 1
#         print(f"{gacha_types[banner_type]}: Fetched page {page} of size {params['size']}")
#         params['end_id'] = end_id
#         sleep(0.3)
#     else:
#         print(f"{gacha_types[banner_type]}: Fetching complited on id {params['end_id']}")
#     return new_wish_dataset

# dataset = {}
# print(params)

# for entry in gacha_types.keys():
#    dataset[gacha_types[entry]] = fetch_banner_wishes(entry)
#    if 'end_id' in list(params.keys()):
#        params.pop('end_id')

# print(dataset)

# output_data = pd.DataFrame(dataset[gacha_types[11]], columns = list(dataset[gacha_types[11]][0].keys()))
# output_data.to_csv(str('submission.csv'), index=False)
# req = requests.get(api_url+endpoint, params=params)
# data = req.json()
# print(params)
# print(get_wishes_data(api_url, params))

if __name__ == "__main__":
    main()