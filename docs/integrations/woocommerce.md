# WooCommerce Integration

This integration takes **5 minutes** to complete.

### Setup your Metisa account
Create your login name, team name, and team URL at https://askmetisa.com/create. You should receive an email with instructions to create a password and login.

### Install
You can easily install Metisa by embedding code snippets into the base template of your website. Click [here](https://codex.wordpress.org/Editing_Files#Things_You_Need_to_Know) to read through the important things you need to know before editing the template files on WordPress.

#### Find your base template file
1. On the WordPress [administrative panel](https://codex.wordpress.org/Administration_Screens), go to **Appearance > Editor** to access the built-in theme editor.
  >**NOTE**: Depending on the level of your user privileges, you may or may not have permission to access the theme editor in the administrative panel. Please contact your website administrator for having your privileges adjusted.

2. From the right hand sidebar navigation, select the theme to edit.

3. Under **Templates**, click on the base template file. You will see the source code of the selected template in the editor.
  >**TIP**: Your base template filename will vary depending on the theme that you have selected. Common names are `header.php` and `second-header.php`.

#### Embed the code snippets
1. Metisa requires v1.5+ jQuery, a library used frequently by web developers. Please make sure jQuery is available.

   Add this to the end of your base template file if your site uses an older version of jQuery or does not use it at all.
   > **NOTE:** Adding this code block when your site already loads jQuery has a very slim chance of breaking your site due to differences between versions.

   ```html
   <script src="https://code.jquery.com/jquery-3.2.1.min.js"
   integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
   crossorigin="anonymous"></script>
   ```

2. Paste the following code block at the end of the template file. Every time a customer browses a specific product or places an order on your store, this will load the script for sending product or order data to the Metisa server. Replace `{% raw %}{{ metisa_account_slug }}{% endraw %}` with your **team slug**. This is the name in your URL when you log in to your [Metisa dashboard](https://askmetisa.com/myteamslug/insights/opportunities).
    ```html
    <?php if (is_product() || is_checkout()):?>
      <!-- loads metisa script for sending product/order data -->
      <script src="{{ book.srcBaseUrl }}/js/v0.0/browser.js"></script>
    <?php endif;?>
    <?php if(is_product()) { // product template
  		// product adapter
  		$product_data = array();
  		$product = wc_get_product(get_the_ID());
  		$product_data['id'] = (string)$product->get_id();
  		$product_data['name'] = $product->get_name();
  		$product_data['maker'] = (!is_null($product->get_attributes()['brand']))? $product->get_attributes()["brand"]->get_options()[0]: null;
  		$product_data['variants'] = [];
  		if (empty($product->get_children())) { // simple product
  			$variant = array();
  			$variant['id'] = $product_data['id'];
  			$variant['name'] = null;
  			$variant['availability'] = ($product->get_stock_status() == "outofstock")? 0: $product->get_stock_quantity();
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
  				$variant['availability'] = ($product_variant->get_stock_status() == "outofstock")? 0: $product_variant->get_stock_quantity();
  				$variant['image_url'] = wp_get_attachment_image_src($product_variant->get_image_id())[0];
  				$variant['url'] = $product_variant->get_permalink();
  				$variant['price'] = (empty($product_variant->get_regular_price()))? null: $product_variant->get_regular_price();
  				$variant['price_discounted'] = (empty($product_variant->get_sale_price()))? null: $product_variant->get_sale_price();
          $product_data['variants'][] = $variant;
        }
      }
    ?>
  	<script>
  		var itemData = <?php echo json_encode($product_data);?>;
  		mt('slug', '{% raw %}{{ metisa_account_slug }}{% endraw %}');
  		mt('item', itemData);
  	</script>
    <?php } elseif (is_checkout()){ // checkout template
  		// order adapter
  		$order_data = array();
  		$order_id = (int) $wp->query_vars["order-received"];
  		$order = wc_get_order($order_id);
  		$customer_id = $order->get_customer_id();
  		$customer = new WC_Customer($customer_id);
			if ($customer_id == 0) { // guest
				$order_data['customer']['first_name'] = $order->get_billing_first_name();
				$order_data['customer']['last_name'] = $order->get_billing_last_name();
				$order_data['customer']['email'] = $order->get_billing_email();
			}
			else { // existing customer
				$order_data['customer']['first_name'] = $customer->get_billing_first_name();
				$order_data['customer']['last_name'] = $customer->get_billing_last_name();
				$order_data['customer']['email'] = $customer->get_billing_email();
			}
			$order_data['id'] = (int) $order->get_order_number();
			$order_data['currency'] = $order->get_currency();
			$order_data['line_items'] = [];
			foreach ($order->get_items() as $item) {
				$line_item = array();
				$line_item['variant_id'] = ($item['variation_id'] == 0)? null: $item['variation_id'];
				$line_item['quantity'] = $item['quantity'];
      	$line_item['price'] = (string)($item['subtotal'] / $item['quantity']);
				$line_item['product_id'] = $item['product_id'];
				$line_item['total_discount'] = (string)($item['subtotal'] - $item['total']);
      	$order_data['line_items'][] = $line_item;
   	 	}
    ?>
  	<script>
  		var actionData = <?php echo json_encode($order_data);?>;
  		mt('slug', '{% raw %}{{ metisa_account_slug }}{% endraw %}');
  		mt('action', actionData);
  	</script>
    <?php }?>
    ```

### Embed your Metisa recommendations

To embed a recommendation block on your site, you need to decide which widget(s) you want and where they should show up.

1. [Log in](https://askmetisa.com/login) to your Metisa dashboard
2. Click on Widgets on the left side bar
3. Preview the various widgets

Once you have chosen a spot on a specific page to embed, copy and paste your **customized code** from your Metisa account.

To get your customized code for the widget:

1. Select the Widget you want to embed (eg. Things you may like)
2. Click on **Activate Now > Customize your options > Click Next**
3. Copy and paste the code from the page into your template file

![screenshot Metisa custom integration widget](/images/custom/custom-1.png)

If your code is embedded correctly, save the changes and you should see your recommendation widget appearing on your site immediately.

> **IMPORTANT**: If you had just installed the code from the [Install](#install) section, your recommendations may not be ready yet, in which case you will see an empty widget with no products.

> In this situation, we recommend you to check back again in a few days (the more traffic your store receives, the shorter the wait) before trying to embed recommendations on your site.
