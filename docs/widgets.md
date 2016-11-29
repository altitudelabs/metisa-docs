# Widgets

### Overview

Widgets are personalized content blocks you can place on your e-commerce web or mobile web store as well as native mobile apps through a webview. These could be product recommendation for a known customer or recommendations based on what a user is viewing. When done well, personalized content could account for over 30% of your sales.

### Getting started

1. Create a widget and customise its look and feel
2. Install the Metisa plugin on all pages of your website
3. Insert the widget code block where the widget should appear

### Creating widgets

Each widget has a HTML template which you can use to customise its look and feel. You can use a 3-column, 4-column or even a carousel layout (with the help of Javascript). You can insert any of the top 16 products a customer is likely to buy in your templates using merge fields.

HTML templates support [Django template tags and filters](https://docs.djangoproject.com/en/1.8/ref/templates/builtins/). You can even use built-in filters like [humanize](https://docs.djangoproject.com/en/1.8/ref/contrib/humanize/) to format data points.

The products are prefixed from `PRO1_` through `PRO16_` and the following merge fields are available:

<table class="table">
    <thead>
        <tr>
            <th class="col-md-4">Description</th>
            <th class="col-md-8">Merge Fields</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Product name</td>
            <td>PRO1_NAME, PRO2_NAME ... PRO16_NAME</td>
        </tr>
        <tr>
            <td>Product description</td>
            <td>PRO1_DESC, PRO2_DESC ... PRO16_DESC</td>
        </tr>
        <tr>
            <td>Product URL</td>
            <td>PRO1_URL, PRO2_URL ... PRO16_URL</td>
        </tr>
        <tr>
            <td>Product image URL</td>
            <td>PRO1_IMG, PRO2_IMG ... PRO16_IMG</td>
        </tr>
        <tr>
            <td>Product list price</td>
            <td>PRO1_PRICE, PRO2_PRICE ... PRO16_PRICE</td>
        </tr>
        <tr>
            <td>Product discounted price</td>
            <td>PRO1_PRICE_D, PRO2_PRICE_D ... PRO16_PRICE_D</td>
        </tr>
        <tr>
            <td>Product discount label (e.g. 30% off, $20 off)</td>
            <td>PRO1_DISCOUNT, PRO2_DISCOUNT ... PRO16_DISCOUNT</td>
        </tr>
    </tbody>
</table>

### Installation

To install a widget, paste the code from `Widget - Installation` onto your website just before the &lt;&#47;body&gt; on all pages that you may want widgets to appear. Replace customer_id with your Customer ID so we know who you want to personalize the widget for.

Then, insert the widget where you want it to appear on your page. You have to replace &#123;&#123;widget_id&#125;&#125; with the Widget ID listed in the Snippet column of the table on `Widget - Widgets`.

**IMPORTANT: Widgets will only render on the page with a valid Customer ID and Widget ID.**