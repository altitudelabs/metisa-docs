# Widgets

### Overview

Widgets are personalized content blocks you can place on your e-commerce web or mobile web store as well as native mobile apps through a webview. These could be product recommendation for a known customer or recommendations based on what a user is viewing. When done well, personalized content could account for over 30% of your sales.

### Getting started

1. Create a widget and customise its look and feel
2. Install the Metisa plugin on all pages of your website
3. Insert the widget code block where the widget should appear

### Creating widgets

Each widget has a HTML template which you can use to customise its look and feel. You can use a 3-column, 4-column or even a carousel layout (with the help of Javascript). You can insert any of the top 16 products a customer is likely to buy in your templates using merge fields.

The products are stored in the products merge field. You can access the products by their indices from `products.0` through `products.15`. Note that indices start from 0. For instance, this merge field inserts the name of the third product:

```
{{product.2.name}}
```

Each product has the following fields:

<table class="table">
    <thead>
        <tr>
            <th class="col-md-8">Field</th>
            <th class="col-md-4">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>Name of the product</td>
        </tr>
        <tr>
            <td>description</td>
            <td>Description of the product</td>
        </tr>
        <tr>
            <td>price</td>
            <td>List price of the product</td>
        </tr>
        <tr>
            <td>discount</td>
            <td>Amount of discount on the product</td>
        </tr>
        <tr>
            <td>price_discounted</td>
            <td>Discounted price of the product</td>
        </tr>
    </tbody>
</table>

### Installation

To install a widget, paste the code from `Widget - Installation` onto your website just before the &lt;&#47;body&gt; on all pages that you may want widgets to appear. Replace customer_id with your Customer ID so we know who you want to personalize the widget for.

Then, insert the widget where you want it to appear on your page. You have to replace &#123;&#123;widget_id&#125;&#125; with the Widget ID listed in the Snippet column of the table on `Widget - Widgets`.

**IMPORTANT: Widgets will only render on the page with a valid Customer ID and Widget ID.**