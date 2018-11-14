from pymongo import MongoClient
from bson.objectid import ObjectId
import json
from pprint import pprint
import time

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

			currentTime = int(time.time()) * 1000
			week = 7 * 24 * 60 * 60 * 1000 

			items[i]['startForSaleDate'] = currentTime
			items[i]['endForSaleDate'] = currentTime + week
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
