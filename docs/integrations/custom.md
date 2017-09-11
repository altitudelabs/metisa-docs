# Custom Integration

This document sets out how you can integrate your custom store data with Metisa to gain access to powerful customer analytics, recommendations and personalized emails.

## Contents

* [Prerequisites](#prerequisites)
* [Integration steps](#steps)
* [Authentication](#auth)
* [Customer API](#customer)
* [Product API](#product)
* [Order API](#order)

## <a id="prerequisites"></a> Prerequisites

To integrate your custom store with Metisa:

1. **You must have a Metisa account.** Custom integrations are available to all Metisa users, whether you're on a Free or Paid tier.
2. **You must have basic technical knowhow.** Anyone comfortable with writing and maintaining a small script should be more than qualified.

## <a id="steps"></a> Integration steps

Metisa analyzes customer purchase history data that comes from your Customer, Product and Order Item tables in your CRM or database. An integration involves sending these records to Metisa API.

Metisa analyzes data once every 24 hours. After you create your customer, product and order records in Metisa, you can expect to see insights in 24 hours.

We recommend syncing at least 1 year of customer, product and order records to Metisa. To do this, you could write a daily script that creates and updates customer, product and order records to Metisa.

## <a id="auth"></a> Authentication

You need an API token in order to access Metisa API. To get your API token, first create an account and add a custom store integration. Your API token will now appear under your user settings.

A request can be made by making an AJAX call to Metisa's API with your API token in the header. Here is an example using curl. Please be sure to replace your API token and store URL for this command to work:

```
curl -X GET https://askmetisa.com/{{ store_url }}/api/v1/customer \
     -H "Authorization: Token {{ api_token }}"
```

## <a id="customer"></a> Customer API

### Fields

<table class="table table-bordered table-hover table-condensed">
    <thead>
        <tr>
            <th title="Field #1">Field</th>
            <th title="Field #2">Format</th>
            <th title="Field #3">Example</th>
            <th title="Field #4">Required</th>
            <th title="Field #5">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>string</td>
            <td>100001</td>
            <td>Yes</td>
            <td>unique identifier</td>
        </tr>
        <tr>
            <td>first_name</td>
            <td>string</td>
            <td>Jane</td>
            <td>Yes</td>
            <td> </td>
        </tr>
        <tr>
            <td>last_name</td>
            <td>string</td>
            <td>Doe</td>
            <td>Yes</td>
            <td> </td>
        </tr>
        <tr>
            <td>description</td>
            <td>string</td>
            <td>from trade sale</td>
            <td>Optional</td>
            <td>Notes for customer</td>
        </tr>
        <tr>
            <td>email</td>
            <td>string</td>
            <td>jane.doe@askmetisa.com</td>
            <td>Optional</td>
            <td> </td>
        </tr>
        <tr>
            <td>dob</td>
            <td>%Y-%m-%d</td>
            <td>1990-06-20</td>
            <td>Optional</td>
            <td>Date of birth</td>
        </tr>
        <tr>
            <td>gender</td>
            <td>M / F</td>
            <td>M</td>
            <td>Optional</td>
            <td>Gender of customer</td>
        </tr>
        <tr>
            <td>phone</td>
            <td>string</td>
            <td>85290950123</td>
            <td>Optional</td>
            <td>Mobile number of customer</td>
        </tr>
        <tr>
            <td>signup_date</td>
            <td>%Y-%m-%d %H:%M:%S</td>
            <td>2016-09-30 20:10:30</td>
            <td>Optional</td>
            <td>Sign up timestamp in UTC</td>
        </tr>
        <tr>
            <td>language</td>
            <td>string</td>
            <td>simplified chinese</td>
            <td>Optional</td>
            <td>Customer&#39;s prefered language</td>
        </tr>
        <tr>
            <td>points</td>
            <td>float</td>
            <td>10234</td>
            <td>Optional</td>
            <td>Customer&#39;s loyal point</td>
        </tr>
        <tr>
            <td>opt_out_email</td>
            <td>Y / N</td>
            <td>Y</td>
            <td>Optional</td>
            <td>Receive email marketing or not</td>
        </tr>
        <tr>
            <td>opt_out_sms</td>
            <td>Y / N</td>
            <td>N</td>
            <td>Optional</td>
            <td>Receive sms marketing or not</td>
        </tr>
    </tbody>
</table>

### Get many customer records

```
GET https://askmetisa.com/{{ store_url }}/api/v1/customer
```

### Get single customer record

```
GET https://askmetisa.com/{{ store_url }}/api/v1/customer/{{ id }}
```

### Create customer record

```
POST https://askmetisa.com/{{ store_url }}/api/v1/customer
```

### Update customer record

```
PUT https://askmetisa.com/{{ store_url }}/api/v1/customer/{{ id }}
PATCH https://askmetisa.com/{{ store_url }}/api/v1/customer/{{ id }}
```

### Delete customer record

```
DELETE https://askmetisa.com/{{ store_url }}/api/v1/customer/{{ id }}
```

## <a id="product"></a> Product API

### Fields

<table class="table table-bordered table-hover table-condensed">
    <thead>
        <tr>
            <th title="Field #1">Field</th>
            <th title="Field #2">Format</th>
            <th title="Field #3">Example</th>
            <th title="Field #4">Required</th>
            <th title="Field #5">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>string</td>
            <td>10002</td>
            <td>Yes</td>
            <td>unique identifier</td>
        </tr>
        <tr>
            <td>name</td>
            <td>string</td>
            <td>Nike LunarEpic Low Flyknit</td>
            <td>Yes</td>
            <td> </td>
        </tr>
        <tr>
            <td>description</td>
            <td>string</td>
            <td>The Nike LunarEpic Low Flyknit Women&#39;s Running Shoe is lightweight and breathable with targeted cushioning for a soft, effortless sensation underfoot.</td>
            <td>Optional</td>
            <td> </td>
        </tr>
        <tr>
            <td>availability</td>
            <td>integer</td>
            <td>10</td>
            <td>Optional</td>
            <td>Number of product in stock. 0 or -1 = unavailable</td>
        </tr>
        <tr>
            <td>image_url</td>
            <td>string</td>
            <td>http://images.nike.com/shoe.jpg</td>
            <td>Optional</td>
            <td>Absolute URL to the product image</td>
        </tr>
        <tr>
            <td>brand</td>
            <td>string</td>
            <td>Nike</td>
            <td>Yes</td>
            <td>Brand of product</td>
        </tr>
        <tr>
            <td>category</td>
            <td>string</td>
            <td>Women</td>
            <td>Yes</td>
            <td>Name of the main category of product</td>
        </tr>
        <tr>
            <td>sub_category1</td>
            <td>string</td>
            <td>Shoes</td>
            <td>Yes</td>
            <td>Name of the sub category of product</td>
        </tr>
        <tr>
            <td>sub_category2</td>
            <td>string</td>
            <td>Running Shoes</td>
            <td>Yes</td>
            <td>Name of the sub category of product under sub_category1</td>
        </tr>
        <tr>
            <td>price</td>
            <td>float</td>
            <td>100.00</td>
            <td>Optional</td>
            <td>Price of product</td>
        </tr>
        <tr>
            <td>discount</td>
            <td>integer</td>
            <td>10</td>
            <td>Optional</td>
            <td>Percentage of discount. e.g: 30</td>
        </tr>
        <tr>
            <td>price_discounted</td>
            <td>float</td>
            <td>90.00</td>
            <td>Optional</td>
            <td>Price of product after discount</td>
        </tr>
        <tr>
            <td>sku</td>
            <td>string</td>
            <td>nike-001</td>
            <td>Optional</td>
            <td>Product with same SKU will be grouped in recommendation</td>
        </tr>
        <tr>
            <td>created_date</td>
            <td>%Y-%m-%d %H:%M:%S</td>
            <td>2016-09-30 20:10:30</td>
            <td>Optional</td>
            <td>Create timestamp in UTC</td>
        </tr>
    </tbody>
</table>

### Get many product records

```
GET https://askmetisa.com/{{ store_url }}/api/v1/product
```

### Get single product record

```
GET https://askmetisa.com/{{ store_url }}/api/v1/product/{{ id }}
```

### Create product record

```
POST https://askmetisa.com/{{ store_url }}/api/v1/product
```

### Update product record

```
PUT https://askmetisa.com/{{ store_url }}/api/v1/product/{{ id }}
PATCH https://askmetisa.com/{{ store_url }}/api/v1/product/{{ id }}
```

### Delete product record

```
DELETE https://askmetisa.com/{{ store_url }}/api/v1/product/{{ id }}
```

## <a id="order"></a> Order API

### Fields

<table class="table table-bordered table-hover table-condensed">
    <thead>
        <tr>
            <th title="Field #1">Field</th>
            <th title="Field #2">Format</th>
            <th title="Field #3">Example</th>
            <th title="Field #4">Required</th>
            <th title="Field #5">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>string</td>
            <td>100003</td>
            <td>Yes</td>
            <td>unique identifier of the order</td>
        </tr>
        <tr>
            <td>customer_id</td>
            <td>string</td>
            <td>100001</td>
            <td>Yes</td>
            <td>id matched with customer who bought</td>
        </tr>
        <tr>
            <td>product_id</td>
            <td>string</td>
            <td>10002</td>
            <td>Yes</td>
            <td>id matched with product bought</td>
        </tr>
        <tr>
            <td>order_date</td>
            <td>%Y-%m-%d %H:%M:%S</td>
            <td>2016-12-31 08:12:22</td>
            <td>Yes</td>
            <td>Order timestamp in UTC</td>
        </tr>
        <tr>
            <td>quantity</td>
            <td>integer</td>
            <td>2</td>
            <td>Yes</td>
            <td>Quantity of product in order</td>
        </tr>
        <tr>
            <td>price</td>
            <td>float</td>
            <td>45.50</td>
            <td>Yes</td>
            <td>Unit price of the product</td>
        </tr>
        <tr>
            <td>currency</td>
            <td>3 character currency code</td>
            <td>USD</td>
            <td>Optional</td>
            <td>Currency of the order made</td>
        </tr>
        <tr>
            <td>fx_rate</td>
            <td>float</td>
            <td>7.78</td>
            <td>Optional</td>
            <td>Exchange rate of currency to store currency</td>
        </tr>
        <tr>
            <td>payment_method</td>
            <td>string</td>
            <td>paypal</td>
            <td>Optional</td>
            <td>Payment gateway used, e.g.: Paypal, CreditCard</td>
        </tr>
        <tr>
            <td>channel</td>
            <td>string</td>
            <td>website</td>
            <td>Optional</td>
            <td>Channel of order made, e.g.: Web, Facebook, Google</td>
        </tr>
        <tr>
            <td>status</td>
            <td>string</td>
            <td>shipped</td>
            <td>Optional</td>
            <td>Status of order</td>
        </tr>
        <tr>
            <td>discount</td>
            <td>float</td>
            <td>4.50</td>
            <td>Yes</td>
            <td>Absolute value discounted</td>
        </tr>
        <tr>
            <td>shipping</td>
            <td>float</td>
            <td>10.00</td>
            <td>Yes</td>
            <td>Payment for shipping</td>
        </tr>
        <tr>
            <td>address</td>
            <td>string</td>
            <td>208 Manhattan St.</td>
            <td>Optional</td>
            <td>Shipping address of the order</td>
        </tr>
        <tr>
            <td>country</td>
            <td>string</td>
            <td>USA</td>
            <td>Optional</td>
            <td>The country of shipping address</td>
        </tr>
        <tr>
            <td>state</td>
            <td>string</td>
            <td>Florida</td>
            <td>Optional</td>
            <td>The state of shipping address</td>
        </tr>
        <tr>
            <td>town</td>
            <td>string</td>
            <td>Auburndale</td>
            <td>Optional</td>
            <td>The town of shipping address</td>
        </tr>
        <tr>
            <td>postal_code</td>
            <td>string</td>
            <td>33823</td>
            <td>Optional</td>
            <td>The postal code of the shipping address</td>
        </tr>
    </tbody>
</table>

### Get many order records

```
GET https://askmetisa.com/{{ store_url }}/api/v1/order
```

### Get single order record

```
GET https://askmetisa.com/{{ store_url }}/api/v1/order/{{ id }}
```

### Create order record

```
POST https://askmetisa.com/{{ store_url }}/api/v1/order
```

### Update order record

```
PUT https://askmetisa.com/{{ store_url }}/api/v1/order/{{ id }}
PATCH https://askmetisa.com/{{ store_url }}/api/v1/order/{{ id }}
```

### Delete order record

```
DELETE https://askmetisa.com/{{ store_url }}/api/v1/order/{{ id }}
```