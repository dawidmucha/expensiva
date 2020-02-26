# EXPENSIVA

Expensiva is a finance tracking app. It allows you to log your expenses to show how much you spend and on what.

## Technologies

This app was written in React using create-react-app and has a Firebase database. Other technologies included in that app are: JIMP, Lodash, Moment.js, Redux, UUID

## Features

- Login using Google account
- Create new "receipts"
	- Set up a date at which that receipt was created(or use a "now" button)
	- They show you the total price of all the items inside a receipt
	- A shop in which that receipt was taken can be selected
	- A summary of all the items is shown
	- You can either edit or remove a receipt
	- Create new items
		- Select it's name, units, amount(and choose if it's a solid amount or fluid amount), price, whether the price is a discount, it's category and subcategory
- Create new categories and shops
	- You can add and remove categories, every category can have it's subcategories which you can also add or remove
	- You can add and remove shops, each shop having a logo you can add
- Settings
	- You can update your avatar
	- You can setup preferred currency from a list and choose whether you want that sign to be a prefix($123) or suffix(123$)
	- You can change date format in which all dates are shown
	- You can choose whether you want a 12-hour or 24-hour time format
	- You can choose whether you want a weight to be shown as kilograms or pounds
	- You can choose whether you want a volume to be shown as liters or fluid ounces

## Screenshots

![ss1](https://i.imgur.com/SsIdilc.png)

What you see after creating an account
___
![ss2](https://i.imgur.com/sjczWuI.png)

Before adding categories and shops
___
![ss3](https://i.imgur.com/pC8r3Lt.png)

Example categories
___
![ss4](https://i.imgur.com/ubBEB8v.png)

About to add 3rd shop
___
![ss5](https://i.imgur.com/vVTQfXf.png)

Adding new receipt
___
![ss6](https://i.imgur.com/VGBuav2.png)
___
Empty receipt

![ss7](https://i.imgur.com/IYCne4W.png)
___
Adding new item

![ss8](https://i.imgur.com/7ZCsQ1h.png)
___
Receipt in edit mode

![ss9](https://i.imgur.com/rVZrMpJ.png)
___
Receipt in dashboard mode

![ss10](https://i.imgur.com/mLv7J9l.png)
___
Settings saved!

![ss11](https://i.imgur.com/kpUMWfR.png)
![ss12](https://i.imgur.com/3CgK9bV.png)
![ss13](https://i.imgur.com/evdsU4q.png)
![ss14](https://i.imgur.com/j20ZOdZ.png)
![ss15](https://i.imgur.com/3swJwIG.png)
___
Optimized for mobile view