# Custom Integration: E-Commerce

Want to use Metisa even though your app is not built with any of the plugin-supported platforms? Use this article to set up your site to take full advantage of Metisa's recommendation engine for store.

This article is intended for an audience with some basic technical knowledge of HTML and JavaScript.

### Contents

* [Prerequisites](#prerequisites)
* [Key concepts](#concepts)
* [Install](#install)
* [Embed recommendations](#recommendations)


### <a id="prerequisites"></a> Prerequisites

To integrate your custom store with Metisa:

1. **You must have a Metisa account.** Custom integrations are available to all Metisa users, whether you're on a Free or Paid tier.
2. **You must have basic technical know-how.** You will be fine if you're comfortable navigating files and inserting code blocks, and some light coding with guidance.
3. **Your store must use a template rendering engine.** EJS, Liquid, Django are some examples. This installation rides on your store's template tags to obtain data to send to Metisa servers.

On the last point, if you are a developer, you may be able integrate with Metisa with a different approach by playing with the [Metisa JavaScript SDK](https://github.com/altitudelabs/metisa-js).


### <a id="concepts"></a> Key concepts

Recommendations are made based on machine learning algorithms that feed on your store data like products, orders, and customers.

We therefore need a way for your store to automatically send such data to Metisa, so that over time (3-7 days depending on site traffic), Metisa will learn enough about your customers' individual preferences to start providing good recommendations that get more accurate with time.

The way to achieve this is through inserting some JavaScript code into the page templates of your e-commerce store.


### <a id="install"></a> Install

There are two main steps to installing the scripts that enable custom integration.

1. [Embed site-wide code](#embed-site-wide-code)
2. [Embed template-specific code](#embed-template-code)

##### <a id="embed-site-wide-code"></a> Step 1: Embed site-wide code snippets

Metisa requires v1.5+ jQuery, a library used frequently by web developers. Please make sure jQuery is available.

Add this to your base template file if your site uses an older version of jQuery or does not use it at all. (Note: adding this code block when your site already loads jQuery has a very slim chance of breaking your site due to differences between versions.)

```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js"
integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
crossorigin="anonymous"></script>
```

> **TIP**: Your base template filename will vary depending on how your developer named it.

> Common names are index and theme, with file extensions like .html, .erb, .ejs, .liquid (eg. index.ejs or theme.liquid)

Once jQuery is available, paste the following script to the same file below jQuery. This will load the Metisa script that is needed to send and receive data to/from Metisa.

```html
<script src="https://s3-ap-southeast-1.amazonaws.com/metisa-sdk/js/v0.0/metisa.js"></script>
```

##### <a id="embed-template-code"></a> Step 2: Embed template-specific code snippets

> **TIP**: This step can be tricky, especially when trying to match data to the right fields.

> Refer to our [examples](https://github.com/altitudelabs/metisa-js) to see how this is implemented for sample stores.

Product data is sent to the Metisa server every time a customer browses a specific product on your store. That is why the **product template file** is where you should place this code snippet that sends data about that specific product to Metisa.

With each page load, the product information is created or updated in the Metisa database.

```html
<script type="text/javascript">
  // Initialize the correct store endpoint to send data to
  mt('slug', '{{ metisa_account_slug }}');

  // Send product data to Metisa
  mt('item', {
    id: '{{ product_id }}',
    name: '{{ product_name }}',
    maker: '{{ product_brand }}',
    variants: [
      {
        id: '{{ variant_id }}',
        name: '{{ variant_name }}',
        availability: '{{ variant_availability }}',
        image_url: '{{ variant_image_url }}',
        url: '{{ variant_url }}',
        price: '{{ variant_price }}',
        price_discounted: '{{ variant_price_discounted }}'
      }
    ]
  });
</script>
```

> **DETAIL**: Note the difference between "product" and "variant". A product can have none or many variants. When a product has no variants, `variants` must still have one object representing the product itself. `variant_name` in such a case should be `null`.

Likewise for order data, you can embed a code snippet to your **order checkout template** so that whenever an order is finalized it will be sent to Metisa servers.

```html
<script type="text/javascript">
  // Initialize the correct store endpoint to send data to
  mt('slug', '{{ metisa_account_slug }}');

  // Send order data to Metisa
  mt('action', {
    id: '{{ order_id }}',
    user: {
      id: '{{ customer_id }}',
      first_name: '{{ customer_first_name }}',
      last_name: '{{ customer_last_name }}',
      email: '{{ customer_email }}'
    },
    currency: '{{ order_currency }}',
    line_items: [
      {
        variant_id: '{{ variant_id }}',
        quantity: '{{ quantity }}',
        price: '{{ variant_price }}',
        item_id: '{{ product_id }}',
        total_discount: '{{ total_discount }}'
      }
    ]
  });
</script>
```

> **DETAIL**: If your store supports "guest" checkouts, you may not generate a `customer_id` and it can be left as `0` or `null`. Metisa will then switch strategy to use email to identify guest customers.


### <a id="recommendations"></a> Embed your Metisa recommendations

To embed a recommendation block on your site, you need to decide which widget(s) you want and where they should show up.

1. [Log in](https://askmetisa.com/login) to your Metisa dashboard
2. Click on Widgets on the left side bar
3. Preview the various widgets

Once you have chosen a spot on a specific page to embed, copy and paste your **customized code** from your Metisa account.

To get your customized code for the widget:

1. Select the Widget you want to embed (eg. Things you may like)
2. Click on Activate Now -> Customize your options -> Click Next
3. Copy and paste the code from the page into your template file

![screenshot Metisa custom integration widget](/images/custom/custom-1.png)

If your code is embedded correctly, save the changes and you should see your recommendation widget appearing on your site immediately.

> **IMPORTANT**: If you had just installed the code from the [Install](#install) section, your recommendations may not be ready yet, in which case you will see an empty widget with no products.

> In this situation, we recommend you to check back again in a few hours (the more traffic your store receives, the shorter the wait) before trying to embed recommendations on your site.
