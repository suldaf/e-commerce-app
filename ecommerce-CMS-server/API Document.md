# API Document

- # Login

  - ### Url

    `/login`

  - ### Method

    `POST`

  - ### Url Params

    `none`

  - ### Data Params

    - #### `Headers:`

      `none`

    - #### `Body:`

      ```json
      {
        "email": "<your email here>", // <String> (Required)
        "password": "<your password here>" // <String> (Required)
      }
      ```

  - ### Success Response

    - #### `Code: 200`

      ##### Content:

      ```json
      {
        "user": {
          "id": "<id given from system",
          "email": "<your email>",
          "role": "<your role>"
        },
        "token": "<access_token given from system>"
      }
      ```

  - ### Error Response

    - #### `Code: 400`

      ##### Content:

      ```json
      {
        "error": "Your email or password wrong"
      }
      ```


- # Register

  - ### Url

    `/register`

  - ### Method

    `POST`

  - ### Url Params

    `none`

  - ### Data Params

    - #### `Headers:`

      `none`

    - #### `Body:`

      ```json
      {
        "email": "<your email here>", // <String> (Required)
        "password": "<your password here>" // <String> (Required)
      }
      ```

  - ### Success Response

    - #### `Code: 200`

      ##### Content:

      ```json
      {
        "id": "<id given from system",
        "email": "<your email>",
      }
      ```

  - ### Error Response

    - #### `Code: 400`

      ##### Content:

      ```json
      {
        "error": "Invalid format email"
      }
      ```


- # Read Product

  - ### Url

    `/products`

  - ### Method

    `GET`

  - ### Url Params

    `none`

  - ### Data Params

    - ### `Headers:`

      `none`
    
    - ### `Body:`
    
      `none`

  - ### Success Response

    - #### `Code: 200`

      ##### Content:

      ```json
      [
        {
        "name": "<product name>",
          "image_url": "<product image>",
          "price": "<price product>",
          "stock": "<stock product>"
        },
        {
          "name": "Sepatu Adidas",
          "image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fid%2Fphotos%2Fadidas-sepatu-kets-sepatu-olahraga-4971493%2F&psig=AOvVaw3Vaqubqxm9aJ6MGSh-o1tX&ust=1613456777666000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJi74oKh6-4CFQAAAAAdAAAAABAE",
          "price": "5000000",
          "stock": "2"
        }
      ]
      ```
      
      
      
      
  
  - ### Error Response
  
    - #### `Code: 500`
  
      ##### Content:
  
      ```json
      {
        "error": "Internal server error"
      }
      ```
  
      
  
    - #### `Code:401`
  
      ##### Content:
    
      ```json
      {
      	"error": "You are not have access here"
      }
      ```


- # Read Product By Id

  - ### Url

    `/products/:id`

  - ### Method

    `GET`

  - ### Url Params

    `id:[Integer]`

  - ### Data Params

    - ### `Headers:`

    ```json
    {
      "token": "<acccess_token from login>" // <String> (Required)
    }
    ```

    - ### `Body:`

      `none`

  - ### Success Response

    - #### `Code: 200`

      ##### Content:

      ```json
      [
        {
          "name": "<product name>",
          "image_url": "<product image>",
          "price": "<price product>",
          "stock": "<stock product>"
        },
        {
          "name": "Sepatu Adidas",
          "image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fid%2Fphotos%2Fadidas-sepatu-kets-sepatu-olahraga-4971493%2F&psig=AOvVaw3Vaqubqxm9aJ6MGSh-o1tX&ust=1613456777666000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJi74oKh6-4CFQAAAAAdAAAAABAE",
          "price": "5000000",
          "stock": "2"
        }
      ]
      ```

  - ### Error Response

    - #### `Code: 500`

      ##### Content:

      ```json
      {
        "error": "Internal server error"
      }
      ```

    - #### `Code:401`

      ##### Content:

      ```json
      {
        "error": "You are not have access here"
      }
      ```


- # Create Product

  - ### Url

    `/products`

  - ### Method

    `POST`

  - ### Url Params

    `none`

  - ### Data Params

    - ### `Headers:`

    ```json
    {
      "token": "<acccess_token from login>" // <String> (Required)
    }
    ```

    - ### `Body:`

    ```json
    {
      "name": "<name product>", // <String> (Required)
      "image_url": "<image product>", //<String> (Required)
      "price": "<price product>", // <Integer> (Required)
      "stock": "<stock product>" // <Integer> (Required)
    }
    ```

  - ### Success Response

    - #### `Code: 201`

      ##### Content:

      ```json
      {
        "message": "Produect successfully created",
        "product": {
          "name": "<product name>",
          "price": "<product price>",
          "stock": "<product stock>"
        }
      }
      ```

  - ### Error Response

    - #### `Code: 400`

      ##### Content:

      ```json
      {
        "error": "name/image_url/price/stock must be filled"
      }
      ```

    - #### `Code: 401`

      ##### Content:

      ```json
      {
        "error": "You are not have access here"
      }
      ```

    - #### `Code: 500`

      ##### Content:

      ```json
      {
        "error": "Internal server error"
      }
      ```

- # Update Product

  - ### Url

    `/products/:id`

  - ### Method

    `PUT`

  - ### Url Params

    `id:[Integer]`

  - ### Data Params

    - ### `Headers:`

      ```json
      {
        "token": "<acccess_token from login>" // <String> (Required)
      }
      ```

    - ### `Body:`

      ```json
      {
        "name": "<new name product>", // <String> (not null)
        "image_url": "<new image product>", //<String> (not null)
        "price": "<new price product>", // <Integer> (not null)
        "stock": "<new stock product>" // <Integer> (not null)
      }
      ```

  - ### Success Response

    - #### `Code: 200`

      ##### Content:

      ```json
      {
        "message": "Product successfully updated",
        "product": {
          "name": "updated product name",
          "image_url": "updated product image_url",
          "price": "updated product price",
          "stock": "updated product stock"
        }
      }
      ```

  - ### Error Response

    - #### `Code: 400`

      ##### `Content:`

      ```json
      {
        "error": "name/image_url/price/stock must be filled"
      }
      ```

    - #### `Code: 401`

      ##### `Content:`

      ```json
      {
        "error": "You are not have access here"
      }
      ```

    - #### `Code: 500`

      ##### `Content:`

      ```json
      {
        "error": "Internal server error"
      }
      ```

- # Delete Product

  - ### Url

    `/products/:id`

  - ### Method

    `DELETE`

  - ### Url Params

    `id:[Integer]`

  - ### Data Params

    - ### `Headers:`

      ```json
      {
        "token": "<acccess_token from login>" // <String> (Required)
      }
      ```

    - ### `Body:`

      `none`

  - ### Success Response

    - #### `Code: 200`

      ##### `Content:`

      ```json
      {
        "message": "Product successfully deleted"
      }
      ```

  - ### Error Response

    - #### `Code: 401`

      ##### `Content:`

      ```json
      {
        "error": "You are not have access here"
      }
      ```

    - #### `Code: 500`

      ##### `Content:`

      ```json
      {
        "error": "Internal server error"
      }
      ```

- # Read Cart

  - ### Url

    `/carts`

  - ### Method

    `GET`

  - ### Url Params

    `none`

  - ### Data Params

    - ### `Headers:`

      ```json
      {
        "token": "<acccess_token from login>" // <String> (Required)
      }
      ```

    - ### `Body:`

      `none`

  - ### Success Response

    - #### `Code: 200`

      ##### `Content:`

      ```json
      [
        {
          "id": "<cart id>",
          "quantity": "<cart quantity>",
          "ProductId": "<product id in this cart>",
          "UserId": "<user id in this cart>",
          "status": "Unpaid",
          "Product": "<Object of product by product id>"
        },
        {
          "id": "1",
          "quantity": "10",
          "ProductId": "1",
          "UserId": "1",
          "status": "Unpaid",
          "Product": {
            "name": "Sepatu Adidas",
      	    "image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fid%2Fphotos%2Fadidas-sepatu-kets-sepatu-olahraga-4971493%2F&psig=AOvVaw3Vaqubqxm9aJ6MGSh-o1tX&ust=1613456777666000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJi74oKh6-4CFQAAAAAdAAAAABAE",
        	  "price": "5000000",
          	"stock": "2"
          }
        }
      ]
      ```

  - ### Error Response

    - #### `Code: 401`

      ##### `Content:`

      ```json
      {
        "error": "You are not have access here"
      }
      ```

    - #### `Code: 500`

      ##### `Content:`

      ```json
      {
        "error": "Internal server error"
      }
      ```

- # Read Cart When Status is Paid

  - ### Url

    `/carts`

  - ### Method

    `GET`

  - ### Url Params

    `none`

  - ### Data Params

    - ### `Headers:`

      ```json
      {
        "token": "<acccess_token from login>" // <String> (Required)
      }
      ```

    - ### `Body:`

      `none`

  - ### Success Response

    - #### `Code: 200`

      ##### `Content:`

      ```json
      [
        {
          "id": "<cart id>",
          "quantity": "<cart quantity>",
          "ProductId": "<product id in this cart>",
          "UserId": "<user id in this cart>",
          "status": "Paid",
          "Product": "<Object of product by product id>"
        },
        {
          "id": "1",
          "quantity": "10",
          "ProductId": "1",
          "UserId": "1",
          "status": "Unpaid",
          "Product": {
            "name": "Sepatu Adidas",
      	    "image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fid%2Fphotos%2Fadidas-sepatu-kets-sepatu-olahraga-4971493%2F&psig=AOvVaw3Vaqubqxm9aJ6MGSh-o1tX&ust=1613456777666000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJi74oKh6-4CFQAAAAAdAAAAABAE",
        	  "price": "5000000",
          	"stock": "2"
          }
        }
      ]
      ```

  - ### Error Response

    - #### `Code: 401`

      ##### `Content:`

      ```json
      {
        "error": "You are not have access here"
      }
      ```

    - #### `Code: 500`

      ##### `Content:`

      ```json
      {
        "error": "Internal server error"
      }
      ```

- # Add Cart

  - ### Url

    `/carts`

  - ### Method

    `POST`

  - ### Url Params

    `none`

  - ### Data Params

    - ### `Headers:`

      ```json
      {
        "token": "<acccess_token from login>" // <String> (Required)
      }
      ```

    - ### `Body:`

      ```json
      {
        "ProductId": "<Integer>"
      }
      ```

  - ### Success Response

    - #### `Code: 200`

      ##### `Content:`

      ```json
      {
        "id": "<cart id>",
        "quantity": "1",
        "ProductId": "<product id in this cart>",
        "UserId": "<user id in this cart>",
        "status": "Unpaid"
      }
      ```

  - ### Error Response

    - #### `Code: 401`

      ##### `Content:`

      ```json
      {
        "error": "You are not have access here" / "Out of stocks"
      }
      ```

    - #### `Code: 500`

      ##### `Content:`

      ```json
      {
        "error": "Internal server error"
      }
      ```

- # Update Cart

  - ### Url

    `/carts`

  - ### Method

    `PUT`

  - ### Url Params

    `none`

  - ### Data Params

    - ### `Headers:`

      ```json
      {
        "token": "<acccess_token from login>" // <String> (Required)
      }
      ```

    - ### `Body:`

      `none`

  - ### Success Response

    - #### `Code: 200`

      ##### `Content:`

      ```json
      {
        "id": "<cart id>",
        "quantity": "<cart quantity>",
        "ProductId": "<product id in this cart>",
        "UserId": "<user id in this cart>",
        "status": "Paid"
      }
      ```

  - ### Error Response

    - #### `Code: 401`

      ##### `Content:`

      ```json
      {
        "error": "You are not have access here" / "Out of stocks"
      }
      ```

    - #### `Code: 500`

      ##### `Content:`

      ```json
      {
        "error": "Internal server error"
      }
      ```

- # Change Quantity Cart

  - ### Url

    `/carts/:id`

  - ### Method

    `PATCH`

  - ### Url Params

    `id:[Integer]`

  - ### Data Params

    - ### `Headers:`

      ```json
      {
        "token": "<acccess_token from login>" // <String> (Required)
      }
      ```

    - ### `Body:`

      ```json
      {
        "status": "<'min' or 'plus'>",
        "productId": "<product id in this cart>"
      }
      ```

      

  - ### Success Response

    - #### `Code: 200`

      ##### `Content:`

      ```json
      {
        "id": "<cart id>",
        "quantity": "<increase or decrease>",
        "ProductId": "<product id in this cart>",
        "UserId": "<user id in this cart>",
        "status": "<cart status>"
      }
      ```

  - ### Error Response

    - #### `Code: 401`

      ##### `Content:`

      ```json
      {
        "error": "You are not have access here" / "Out of stocks"
      }
      ```

    - #### `Code: 500`

      ##### `Content:`

      ```json
      {
        "error": "Internal server error"
      }
      ```

- # Delete Cart

  - ### Url

    `/carts/:id`

  - ### Method

    `DELETE`

  - ### Url Params

    `id:[Integer]`

  - ### Data Params

    - ### `Headers:`

      ```json
      {
        "token": "<acccess_token from login>" // <String> (Required)
      }
      ```

    - ### `Body:`

      `none`

      

  - ### Success Response

    - #### `Code: 200`

      ##### `Content:`

      ```json
      {
        "message": "success delete a cart"
      }
      ```

  - ### Error Response

    - #### `Code: 401`

      ##### `Content:`

      ```json
      {
        "error": "You are not have access here"
      }
      ```

    - #### `Code: 500`

      ##### `Content:`

      ```json
      {
        "error": "Internal server error"
      }
      ```
