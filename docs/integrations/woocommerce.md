# WooCommerce Integration

This integration takes **5 minutes** to complete.

### Setup your Metisa account

#### Create account
Create your login name, team name, and team URL at https://askmetisa.com/create. You should receive an email with instructions to create a password and login.
![woocommerce integration screenshot 1](/images/woocommerce/woocommerce-1.png)

#### Add integration
1. After your first login, click **Integrate Your Store Now** in the Metisa dashboard.
![woocommerce integration screenshot 2](/images/woocommerce/woocommerce-2.png)

2. Choose **WooCommerce** in **Add Store Integration**.
![woocommerce integration screenshot 3](/images/woocommerce/woocommerce-3.png)

3. Enter **your App URL** and click on **Integrate**.
![woocommerce integration screenshot 4](/images/woocommerce/woocommerce-4.png)

### Install
You can easily install Metisa plugin by embedding code snippets into the base template of your website. Click [here](https://codex.wordpress.org/Editing_Files#Things_You_Need_to_Know) to read through the important things you need to know before editing the template files on WordPress.

#### Find your base template file
1. On the WordPress administrative panel, go to **Appearance > Editor** to access the built-in theme editor.
  >**NOTE**: Depending on the level of your user privileges, you may or may not have permission to access the theme editor in the administrative panel. Please contact your website administrator for having your privileges adjusted.

  ![woocommerce integration screenshot 5](/images/woocommerce/woocommerce-5.png)

2. From the right hand sidebar navigation, select the theme to edit.

3. Under **Templates**, click on the base template file. You will see the source code of the selected template in the editor.
  >**TIP**: Your base template filename will vary depending on the theme that you have selected. Common names are `header.php` and `second-header.php`.

#### Embed the code snippets
1. Metisa requires v1.5+ jQuery, a library used frequently by web developers. Please make sure jQuery is available.

   Add this to the end of your base template file if your site uses an **older version of jQuery** or **does not use it at all** .
   > **NOTE**:Adding this code block when your site already loads jQuery has a very slim chance of breaking your site due to differences between versions.

   ```html
   <script src="https://code.jquery.com/jquery-3.2.1.min.js"
   integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
   crossorigin="anonymous"></script>
   ```

2. Paste the following code block at the end of the template file. Every time a customer browses a specific product or places an order on your store, this will load the script for sending product or order data to the Metisa server. Replace `{% raw %}{{ metisa_account_slug }}{% endraw %}` with your **team slug**. This is the name in your URL when you log in to your [Metisa dashboard](https://askmetisa.com/myteamslug/insights/opportunities).
  ```html
  <script>
    // define your team slug
    <?php $slug = '{% raw %}{{ metisa_account_slug }}{% endraw %}';?>
    // loads metisa script
    var browser = document.createElement("script");
    browser.src = "{{book.srcBaseUrl}}/js/v0.0/browser.js";
    document.head.appendChild(browser);
    browser.onload = function() {
      var mt = document.createElement("script");
      mt.innerHTML = "mt('slug','<?php echo $slug?>');";
      <?php if(is_product()) { // product template
        // product adapter
        $product = wc_get_product();
        if (!empty($product)) {
          $product_data = array();
          $product_data['id'] = (string) $product->get_id();
          $product_data['name'] = $product->get_name();
          $product_data['maker'] = (!is_null($product->get_attributes()['brand']))? $product->get_attributes()['brand']->get_options()[0]: null;
          $product_data['variants'] = [];
          if (empty($product->get_children())) { // simple product
            $variant = array();
            $variant['id'] = $product_data['id'];
            $variant['name'] = null;
            $variant['availability'] = ($product->get_stock_status() == 'outofstock')? 0: $product->get_stock_quantity();
            $variant['image_url'] = wp_get_attachment_image_src($product->get_image_id())[0];
            $variant['url'] = $product->get_permalink();
            $variant['price'] = (empty($product->get_regular_price()))? null: $product->get_regular_price();
            $variant['price_discounted'] = (empty($product->get_sale_price()))? null: $product->get_sale_price();
            $product_data['variants'][] = $variant;
          }
          else { //variable product
            foreach ($product->get_children() as $child_id) {
              $product_variant = wc_get_product($child_id);
              $variant = array();
              $variant['id'] = $child_id;
              $variant['name'] = join(' / ',array_values($product_variant->get_variation_attributes()));
              $variant['availability'] = ($product_variant->get_stock_status() == 'outofstock')? 0: $product_variant->get_stock_quantity();
              $variant['image_url'] = wp_get_attachment_image_src($product_variant->get_image_id())[0];
              $variant['url'] = $product_variant->get_permalink();
              $variant['price'] = (empty($product_variant->get_regular_price()))? null: $product_variant->get_regular_price();
              $variant['price_discounted'] = (empty($product_variant->get_sale_price()))? null: $product_variant->get_sale_price();
              $product_data['variants'][] = $variant;
            }
          }?>
          mt.innerHTML += 'var itemData = <?php echo json_encode($product_data);?>;';
          mt.innerHTML += "mt('item', itemData);";
      <?php }} else if (is_checkout()) { // checkout template
        // order adapter
        $order_id = (int) $wp->query_vars['order-received'];
        if (!empty($order_id)) {
          $order_data = array();
          $order = wc_get_order($order_id);
          $customer_id = $order->get_customer_id();
          $order_data['user']['id'] = $customer_id;
          if (empty($customer_id)) { // guest
            $order_data['user']['first_name'] = $order->get_billing_first_name();
            $order_data['user']['last_name'] = $order->get_billing_last_name();
            $order_data['user']['email'] = $order->get_billing_email();
          }
        else { // existing customer
          $customer = new WC_Customer($customer_id);
          $order_data['user']['first_name'] = $customer->get_first_name();
          $order_data['user']['last_name'] = $customer->get_last_name();
          $order_data['user']['email'] = $customer->get_email();
        }
        $order_data['id'] = (int) $order->get_order_number();
        $order_data['currency'] = $order->get_currency();
        $order_data['line_items'] = [];
        foreach ($order->get_items() as $item) {
          $line_item = array();
          $line_item['variant_id'] = ($item['variation_id'] == 0)? $item['product_id']: $item['variation_id'];
          $line_item['quantity'] = $item['quantity'];
          $line_item['price'] = (string)($item['subtotal'] / $item['quantity']);
          $line_item['item_id'] = $item['product_id'];
          $line_item['total_discount'] = (string)($item['subtotal'] - $item['total']);
          $order_data['line_items'][] = $line_item;
        }?>
        mt.innerHTML += 'var actionData = <?php echo json_encode($order_data);?>;';
        mt.innerHTML += "mt('action', actionData);";
      <?php }}?>
      document.head.appendChild(mt);
    }
  </script>
  ```

### Embed your Metisa recommendations

To embed a recommendation block on your site, you need to decide which widget(s) you want and where they should show up.

1. [Log in](https://askmetisa.com/login) to your Metisa dashboard
2. Click on **Widgets** on the left hand sidebar
3. Select the widget you want to embed (eg. Things you may like)
4. Click on **Activate Now**. You will see the preview of your widget. You may also customize the widget options under **Setup Widget** on the left.
![woocommerce integration screenshot 6](/images/woocommerce/woocommerce-6.png)
5. Click **Next** to get your customized widget code snippet. Paste the code into the spot you want to embed the widget in the template file.
![woocommerce integration screenshot 6](/images/woocommerce/woocommerce-7.png)

If your code is embedded correctly, save the changes and you should see your recommendation widget appearing on your site immediately.

> **IMPORTANT**: If you had just installed the code from the [Install](#install) section, your recommendations may not be ready yet, in which case you will see an empty widget with no products.

> In this situation, we recommend you to check back again in a few hours (the more traffic your store receives, the shorter the wait) before trying to embed recommendations on your site.

### You have integrated - What's next?

Congratulations, that was all you need to do to get set up with Metisa! So, what now?

The moment you successfully integrated, Metisa has started to work on your data, running machine learning algorithms to make sense of your customers. This **analyzing process usually takes less than 15 minutes**, but depending on the amount of data you have (ie. number of sales transactions, customers, products), it can sometimes take up to an hour to finish the process.

Check back in an hour and your Metisa dashboard should be ready to help you supercharge your e-commerce sales. You can login to your Metisa dashboard [here](https://askmetisa.com/login).
