import requests
import pymysql

connection = pymysql.connect(
    host='yellu-mysql.cv910hqsuyvy.us-east-1.rds.amazonaws.com',
    user='root',
    password='cowcow24',
    database='skku_room'
)
cursor = connection.cursor()

itemIds = []
rooms = []
addr = "성균관대"
type = "원룸"
geohashs = ['wydk1']
#geohashs = ['wydk3']

for geohash in geohashs:
    url = f"https://apis.zigbang.com/v2/items/\
oneroom?geohash={geohash}&\
depositMin=0&rentMin=0&\
salesTypes[0]=전세&salesTypes[1]=월세&\
domain=zigbang&checkAnyItemWithoutFilter=true"
    response = requests.get(url)
    data = response.json()["items"]
    for item in data:
        itemIds.append({'itemId' : item["itemId"]})
for item in itemIds:
    detailurl = f"https://apis.zigbang.com/v3/items/{item['itemId']}?version=&domain=zigbang"
    response = requests.get(detailurl)
    data = response.json()["item"]
    rooms.append(data)

for room in rooms:
    insert_query = item_query = """
    INSERT INTO item (itemId, salesType, serviceType, imageThumbnail, description, updatedAt, bathroomCount, residenceType, jibunAddress)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    item_data = (
        room['itemId'],
        room['salesType'],
        room['serviceType'],
        room['imageThumbnail'],
        room['description'],
        room['updatedAt'],
        room['bathroomCount'],
        room['residenceType'],
        room.get('jibunAddress', "")  # Use get to provide a default value if the key is not present
    
    )
    print(room['itemId'])
    cursor.execute(item_query, item_data)

    price_query = """
    INSERT INTO price (itemId, deposit, rent)
    VALUES (%s, %s, %s)
    """
    price_data = (
        room['itemId'],
        room['price']['deposit'],
        room['price']['rent']
    )
    cursor.execute(price_query, price_data)

    room_query = """
    INSERT INTO room (itemId, roomType, title, roomDirection, directionCriterion)
    VALUES (%s, %s, %s, %s, %s)
    """
    room_data = (
        room['itemId'],
        room['roomType'],
        room['title'],
        room['roomDirection'],
        room['directionCriterion']
    )
    cursor.execute(room_query, room_data)

    location_query = """
    INSERT INTO location (itemId, lat, lng)
    VALUES (%s, %s, %s)
    """

    location_data = (
        room['itemId'],
        room['randomLocation']['lat'],
        room['randomLocation']['lng']
    )

    cursor.execute(location_query, location_data)

    parking_query = """
    INSERT INTO parking (itemId, parkingAvailableText, parkingCountText)
    VALUES (%s, %s, %s)
    """

    parking_data = (
        room['itemId'],
        room['parkingAvailableText'],
        room.get('parkingCountText', "")
    )

    cursor.execute(parking_query, parking_data)

    options_query = """
    INSERT INTO options (itemId, inoption)
    VALUES (%s, %s)
    """
    for option in room['options']:
        option_data = (room['itemId'], option)
        cursor.execute(options_query, option_data)
    
    # Assuming images is a list of image URLs in each room
    images_query = """
    INSERT INTO image (itemId, imageUrl)
    VALUES (%s, %s)
    """
    for index, image_url in enumerate(room['images']):
        image_data = (room['itemId'], image_url)
        cursor.execute(images_query, image_data)

    floor_query = """
    INSERT INTO floor (itemId, allFloors, floor)
    VALUES (%s, %s, %s)
    """

    floor_data = (
        room['itemId'],
        room['floor']['allFloors'],
        room['floor']['floor']
    )

    cursor.execute(floor_query, floor_data)
    
    area_query = """
    INSERT INTO area (itemId, 전용면적M2)
    VALUES (%s, %s)
    """

    area_data = (
        room['itemId'],
        room['area']['전용면적M2'],
    )

    cursor.execute(area_query, area_data)
connection.commit()
cursor.close()
connection.close()


