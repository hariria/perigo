from pymongo import MongoClient
from bson.objectid import ObjectId
import json
from pprint import pprint
import datetime

items = []
users = []

def parseJSON():
	with open('generated.json') as handle:
		dictdump = json.loads(handle.read())
		users = dictdump['users']
		items = dictdump['items']

		for i in range(len(users)):
			users[i]['_id'] = ObjectId()

		for i in range(len(items)):

			currentTime = int(datetime.datetime.now().strftime("%s")) * 1000 

			items[i]['startForSaleDate'] = currentTime
			items[i]['endForSaleDate'] = currentTime + 604800000
			items[i]['_id'] = ObjectId()

			items[i]['userSellingItem'] = users[i]['_id']

			users[i]['sellingItems'].append(items[i]['_id'])


		return (items, users)

def populateDB(result):

	pprint(result)

	client = MongoClient('localhost', 27017)

	client.drop_database('perigo')

	db = client.perigo

	item = db.Item
	user = db.User


	db.Item.insert_many(result[0])
	db.User.insert_many(result[1])


populateDB(parseJSON())
