# Emails

### Overview

Emails are an important communication channel in customer relationship management (CRM). The goal of CRM is to maximize total [customer lifetime value (CLV)](insights.md#customer-lifetime-value) of your customers. The best way to do this is lifecycle marketing, which is to have different strategies for a customer depending on what stage of the lifecycle he is at. For instance, if a customer is a one-time buyer, the goal is to convert him into an active buyer. If a customer is at-risk, the focus is to win him back. By doing this effectively, a marketer is maximizes the total CLV of the store's customers.

![](/images/email/lifecycle.png)

### Sending emails

Sending emails with Metisa takes only a minute to setup and come at no additional cost to you.

If you use other email providers, you can export customer segments as a CSV file within Metisa's **Segments - Customers** view. Please refer to the screenshot below.

![](/images/email/export-customers.png)

### Getting started

1.  Set up strategies: Set up marketing strategies and ideas for different customer segments.
2.  Experiment: Create one-off campaigns to test how each idea contributes to sales.
3.  Automate: Automate strategies that work well and we will schedule your campaigns to maximise sales.

### Creating a strategy

Strategies are goals you want to achieve on a customer segment, such as:

* Activating new customers
* Activating one-time customers
* Winback at-risk customers
* Winback lost customers
* Product launch
* Events and promotions

You can test one or more ideas for a strategy. For instance, an idea for a strategy to winback at-risk customers could be a 10% discount. Another idea could be to give customers free shipping on their next purchase when they make their first purchase. When a campaign is sent, Metisa allocates one idea to each customer to maximize sales.

By default, campaigns for each strategy are manually created. You can also ask Metisa to schedule campaigns automatically.

#### Video Tutorial

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/lVsajEBgCKk" frameborder="0" allowfullscreen></iframe></div>

#### Email templates

You use HTML and CSS to tweak the layout, content and style of your email templates and merge fields to personalize the experience for each customers. You can use the following merge fields in your templates:

<table class="table">
    <thead>
        <tr>
            <th class="col-md-8">Merge field</th>
            <th class="col-md-4">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>FNAME</td>
            <td>First name</td>
        </tr>
        <tr>
            <td>LNAME</td>
            <td>Last name</td>
        </tr>
        <tr>
            <td>LANGUAGE</td>
            <td>Language preference (if any)</td>
        </tr>
        <tr>
            <td>POINTS</td>
            <td>Loyalty point balance (if any)</td>
        </tr>
        <tr>
            <td>PRO1_ID, PRO2_ID, ... PRO16_ID</td>
            <td>Product Id for product recommendation</td>
        </tr>
        <tr>
            <td>PRO1_NAME, PRO2_NAME, ... PRO16_NAME</td>
            <td>Product name for product recommendation</td>
        </tr>
        <tr>
            <td>PRO1_DESC, PRO2_DESC, ... PRO16_DESC</td>
            <td>Product description for product recommendation</td>
        </tr>
        <tr>
            <td>PRO1_URL, PRO2_URL, ... PRO16_URL</td>
            <td>Link to product page for product recommendation</td>
        </tr>
        <tr>
            <td>PRO1_IMG, PRO2_IMG, ... PRO16_IMG</td>
            <td>Link to product image for product recommendation</td>
        </tr>
    </tbody>
</table>

##### Recommendations

Personalize content for each customer in your templates by using product recommendation merge fields. You have access to the top 16 products that a customer is likely to buy.

##### Multiple languages

If your customers have language preferences, you can create template variants for every language using the `{{LANGUAGE}}` merge field. You can also use this merge field in the Subject of your campaign.

{% raw %}
```
{% if LANGUAGE == 'french' %}
// French content here
{% elif LANGUAGE == 'chinese' %}
// Chinese content here
{% else %}
// Default content here
{% endif %}

```
{% endraw %}

##### Loyalty points

If your store has a loyalty point system, you can display loyalty point balances using `{{POINTS}}` merge field.

### Sending a one-time campaign

####Video Tutorial

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/FZKoouRU-qQ" frameborder="0" allowfullscreen></iframe></div>