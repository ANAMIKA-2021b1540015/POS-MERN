Restaurant Point of Sale (POS) System-
----------------------------------------

Table of Contents
----------------------------------------
1. Introduction
2.  Features
3.  Technologies Used
4.  Usage
5.  API Endpoints
6.  Screenshots
7.  Contributing
8.  License

_____________________________________________________________________________________________________________________________________________________________________________
1.  Introduction

This is a full-stack web application developed for managing the point of sale (POS) system in restaurants. The system allows restaurant staff to handle customer orders, generate bills in PDF format, manage inventory, and handle user authentication.


2.  Features:-
-------------------------------------------------------
      2.1  User authentication (Login/Register)
      2.2  CRUD operations for items
      2.3  Adding items to the cart
      2.4  Billing generation with PDF support
      2.5  Customer management
      2.6  User-friendly interface



3.  Technologies Used
---------------------------------------------------------
      3.1 Frontend:
           React.js
           Redux for state management
           antd for UI components
    
      3.2  Axios for API requests
    
      3.3  Backend:
          ANode.js with Express.js for the RESTful API
          MongoDB for the database
          Mongoose for MongoDB object modeling


4.  Usage
--------------------------------------------------------------

      Register a new account or login with existing credentials.
      Add items to the cart from the available menu.
      Review the cart and proceed to billing.
      Generate a PDF bill for the order.
      Manage inventory and customer data as needed.




5.  API Endpoints
--------------------------------------------------------------
      POST /api/users/register: Register a new user.
      POST /api/users/login: Login a user.
      GET /api/items: Get all items.
      POST /api/items: Add a new item.
      PUT /api/items/:id: Update an existing item.
      DELETE /api/items/:id: Delete an item.
      GET /api/customers: Get all customers.
      POST /api/customers: Add a new customer.
      PUT /api/customers/:id: Update an existing customer.
      DELETE /api/customers/:id: Delete a customer.
__________________________________________________________________________________________________________________________________________________________
6.Screenshots


<img width="960" alt="Screenshot 2024-02-18 014800" src="https://github.com/rajatmishra11/POS_MERN/assets/96973292/be1574c5-6bc2-407f-a529-07a72dd5c42b">
<img width="958" alt="Screenshot 2024-02-14 223841" src="https://github.com/rajatmishra11/POS_MERN/assets/96973292/a4e87ed7-ed65-47b8-afce-0f11a723b1de">
<img width="960" alt="Screenshot 2024-02-14 223854" src="https://github.com/rajatmishra11/POS_MERN/assets/96973292/93f36b1c-0dab-40ed-b3d2-a74fb64fc5e8">
<img width="960" alt="Screenshot 2024-02-18 015648" src="https://github.com/rajatmishra11/POS_MERN/assets/96973292/523d2c89-4065-4aed-8df3-7e6e2df43f69">
<img width="947" alt="Screenshot 2024-02-18 015633" src="https://github.com/rajatmishra11/POS_MERN/assets/96973292/365b3e93-3384-42b6-acdf-12390b63cf9a">
<img width="826" alt="Screenshot 2024-02-18 015620" src="https://github.com/rajatmishra11/POS_MERN/assets/96973292/95ae2707-1ce7-4501-ac16-e29fdb7920ad">
<img width="960" alt="Screenshot 2024-02-18 015555" src="https://github.com/rajatmishra11/POS_MERN/assets/96973292/4ab8ca20-f293-44b7-8d66-07c1c13d70fd">
<img width="957" alt="Screenshot 2024-02-18 014902" src="https://github.com/rajatmishra11/POS_MERN/assets/96973292/d7522422-81c3-4ed9-b0dd-03d2177fe5a7">


_____________________________________________________________________________________________________________________________________________________________
7.  Contributing

Contributions are welcome! Please fork the repository and create a pull request with your proposed changes.

____________________________________________________________________________
8.  License
This project is licensed under the MIT License.
