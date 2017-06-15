# Custom Integration

This document sets out how you can integrate your custom store with Metisa. It is intended for readers with technical knowledge.

Metisa analyzes customer purchase history data that comes from your Customer, Product and Order Item tables in your CRM or database. From this data, you will generate 3 files: Customer.csv, Product.csv and Order.csv.

For details on required fields/columns, please refer to the links below:

* [Customer.csv](#customer)
* [Product.csv](#product)
* [Order.csv](#order)

Integrating with Metisa requires setting up a recurring task or cronjob that will upload these 3 CSV files to us every day at the close of your business day.

### Integration steps

Once your data is in the right format, the integration process takes approximately 5 working days and involves the following steps:

1. Generate Customer.csv, Product.csv and Order.csv
2. Contact us at hello@askmetisa.com to create your account. We will set up your account and give you an account name, API key and API secret that you can use to [upload your files](#upload)
3. Upload your first batch of CSV files that contain at least 1 year of historical data
4. Upload subsequent batches of CSV files (only the new rows you want to update) on a daily basis

### <a id="upload"></a> Uploading files

CSV files can be uploaded with a PUT request.

File names must be prefixed with the current date in the format `%Y%m%d-Customer.csv`, `%Y%m%d-Product.csv` and `%Y%m%d-Order.csv`.

For instance, if you are uploading data for 1 January 2017, your files should be named 20170101-Customer.csv, 20170101-Product.csv and 20170101-Order.csv.

Below is a sample bash script that you can use to upload a file.

```
# Populate the variables here
file=/path/to/file/to/20170101-Customer.csv
account=<ACCOUNT_NAME>
s3Key=<API_KEY>
s3Secret=<API_SECRET>

# DO NOT EDIT BELOW THIS LINE
resource="/${account}/${file}"
contentType="application/x-compressed-tar"
dateValue=`date -R`
stringToSign="PUT\n\n${contentType}\n${dateValue}\n${resource}"
signature=`echo -en ${stringToSign} | openssl sha1 -hmac ${s3Secret} -binary | base64`

curl -X PUT -T "${file}" \
  -H "Host: ${account}.s3.amazonaws.com" \
  -H "Date: ${dateValue}" \
  -H "Content-Type: ${contentType}" \
  -H "Authorization: AWS ${s3Key}:${signature}" \
  https://${account}.s3.amazonaws.com/${file}
```

### <a id="customer"></a> Customer.csv

File names must be prefixed with the current date in the format `%Y%m%d-Customer.csv`.

For instance, if you are uploading data for 1 January 2017, your files should be named 20170101-Customer.csv.

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

### <a id="product"></a> Product.csv

File names must be prefixed with the current date in the format `%Y%m%d-Product.csv`.

For instance, if you are uploading data for 1 January 2017, your files should be named 20170101-Product.csv.

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

### <a id="order"></a> Order.csv

File names must be prefixed with the current date in the format `%Y%m%d-Order.csv`.

For instance, if you are uploading data for 1 January 2017, your files should be named 20170101-Order.csv.

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