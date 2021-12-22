## Quick Compo

 <img width="390" alt="Screen Shot 1443-05-16 at 2 55 34 PM" src="https://user-images.githubusercontent.com/75578380/146763843-1c94ffe8-3922-4e77-933d-28a256e4a7d8.png">



## Description

in ***digital menu*** , restaurant owners can create their own digital menus on the website. It improves the experience of the customers and makes it more convenient, while also offering the owners valuable insight into their customer preferences and behaviors across all branches.

## User Stories

**Admin**

- **Signup:** As a user I can sign up in the platform so that I can start creating my digital menu. 
- **Login:** As a user I can login to the platform so that I can  start creating my digital menu.
- **Logout:** As a user I can logout from the platform so no one else can use it.
- **CRUD for menu items** As a user I can do CRUD operations for my menu items.
- **Add branches** As a user I can add branches.
- **Cusomize the theme** As a user I can cusomize the theme of my menu.
- **Add multiple languages** As a user I can add multiple languages for my menu.
- **View statistics** As a user I can view statistics about my branches sales.
- **Generate a barcode** As a user I can generate a barcode listing all my local branches with links to their menus.
- **CRUD for branches** As a user I can do CRUD operations for my branches.

**Branch Admin**

- **Login:** As a user I can login to the platform so that I can track customers orders.
- **Logout:** As a user I can logout from the platform so no one else can use it.
- **Mark unavailable items** As a user I can mark unavailable items to update the menu.
- **Track orders** As a user I can track the orders and mark their status.
- **View statistics** As a user I can view statistics about my sales.
- **Generate a barcode** As a user I can generate a barcode linking to my local menu.

**User**

- **View menu:** As a user/customer I can view the munu of the restaurant by a barcode. 
- **Order:** As a user/customer I can add my orders to the cart.
- **Add notes:** As a user/customer I can add spesific notes to my order.
- **Change language:**  As a user/customer I can read the munu in a language I understand.
- **See the status of my order** As a user/customer I can see wether my order was received or not.
- **Access branch's contact information** As a user/customer I can call my resturant.

## Features

- Support languages, I18n.
- Adding multiple branches. 
- Selecting a theme.
- Adding endless dishes and sections.
- Immediate updates for orders status.

## Backlog

- Support  portfolios as well.

- Add multiple templates for usere to choose. 

  

# Client / Frontend

## React Router Routes (React App)

| Path                                      | Component | Permissions                             | Behavior                                                     |
| ----------------------------------------- | --------- | --------------------------------------- | ------------------------------------------------------------ |
| `/`                                       |           | public `<Route>`                        | Home page                                                    |
| `/signup`                                 | Sign_up   | anon  `<AnonRoute>`                     | Signup form, link to login, navigate to dashboard after signup. |
| `/login`                                  | Log_in    | anon  `<AnonRoute>`                     | Login form, link to signup, navigate to dashboard after login |
| `/dash/:adminId/:branchId`                | Branch    | branch supervisor only `<PrivateRoute>` | Shows all orders, change their status, access branch statistics, toggle the availability of menu items. Generate barcode to the branche menu. |
| `/dash/:adminId`                          | Main      | admin only `<PrivateRoute>`             | CRUD on menu items, menu sections and branches. Change theme, and access restaurant statistics. Generate barcode to all asigned branches menu. |
| `/menu/:adminId/:branchId`                | Menu      | anon  `<AnonRoute>`                     |                                                              |
| `/menu/:adminId/:branchId/detail/:itemId` | Details   | anon  `<AnonRoute>`                     |                                                              |
| `/cart/:adminId/:branchId`                | Cart      | anon  `<AnonRoute>`                     |                                                              |
| `/orders/:adminId/:branchId`              | Orders    | anon  `<AnonRoute>`                     |                                                              |
|                                           |           |                                         |                                                              |
|                                           |           |                                         |                                                              |
|                                           |           |                                         |                                                              |
|                                           |           |                                         |                                                              |
|                                           |           |                                         |                                                              |

## Components

**Menu:**

- AddButton.js	
- Details.js	
- Nav.js		
- Sections.js
- Cart.js		
- Menu.js		
- Orders.js

**loging Forms:**

- Log_in.js	
- Sign_up.js

**Admin Dashboard:**

- Branches.js		
- Menu.js			
- Statistics.js
- MainD.js		
- Sections.js		
- StickyHeadTable.js

**Branch Dashboard:**

- Barcode.js
- CollapsibleTable.js	
- Menu.js
- Branch.js		
- Gradient.js		
- Orders.js
- Bubble.js		
- Item.js
- Button.js		
- Line.js

# Server / Backend

## Models

Admin model

```
{
     name: {
      type: String,
      required: [true, 'admin name should be provided']
    },
    email: {
      type: String,
      required: [true, 'Email should be provided']
    },
    password: {
      type: String,
      required: [true, 'Password should be provided']
    }
}
```

Menu Item model

```
 {
    name: {
      type: Object,
      required: [true, 'Dish name should be provided']
    },
    description: {
      type: Object,
      required: [true, 'Dish description should be provided']
    },
    image: {
      type: String,
      required: [true, 'Dish image should be provided']
    },
    price: {
      type: Number,
      required: [true, 'Dish price should be provided']
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Admin id should be provided'],
      ref: "Admin"
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Section id should be provided'],
      ref: "Section"
    }
 }
```

 Missing model

```
{ 
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'menu id should be provided'],
        ref: "Menu"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'user id should be provided'],
      ref: "User"
    }
}
```

 Section model

```
{ 
   name: {
      type: Object,
      required: [true, 'Section name should be provided']
    },
    image:{
      type: String,
      required: [true, 'Section image should be provided']
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'admin id should be provided'],
      ref: "Admin"
    }
}
```

 User model

```
{
    name: {
      type: String,
      required: [true, 'User name should be provided']
    },
    city: {
      type: String,
      required: [true, 'City should be provided']
    },
    district: {
      type: String,
      required: [true, 'District should be provided']
    },
    email: {
      type: String,
      required: [true, 'Email should be provided']
    },
    password: {
      type: String,
      required: [true, 'Password should be provided']
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Admin id should be provided'],
      ref: "Admin"
    }
}
```



## Technologies

- Cloudinary to upload photos.
- Firebase for orders quick update.
- JWT and Bcrypt. 
- Front libraries: React, Material UI,  Apexcharts, Qrcode.
- Node.
- Express.
- Mongoose.
