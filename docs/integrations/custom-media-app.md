# Custom Integration: Media App

Want to use Metisa's recommendation engine for your app that isn't quite an e-commerce store? Use this article to integrate your web app to take full advantage of Metisa, and gain access to personalized item Recommendations for all your users, predictive analytics Insight Reports, emails and more.

A media app is any web-based application that serves content, be it soundtracks, articles, visual assets, or anything in between. You can integrate news sites (eg. The New York Times), music streaming sites (eg. Spotify), stock photography sites (eg. Shutterstock) with Metisa, as a few examples.

This article is intended for an audience with some basic technical knowledge of HTML and JavaScript.

## Contents

* [Benefits of using Metisa for your app](#benefits)
* [Prerequisites](#prerequisites)
* [Key concepts](#concepts)
* [Install](#install)
* [Embed recommendations](#recommendations)

## <a id="benefits"></a> Benefits of using Metisa for your app

Metisa started out with e-commerce. However, we've received numerous enquiries about using Metisa's recommendation engine for apps that are not quite online shops. This article addresses that need.

The benefits of integrating your media app with Metisa are:
* Ability to automatically recommend items to your users, personalized for every individual
* Recommend items on your website as well as embedded in emails
* No need to export and dump data into Metisa; it starts working immediately after integration setup
* Recommendations get better with time, as more data means better machine learning

Can't wait already? Read on to setup your integration in the following sections!


## <a id="prerequisites"></a> Prerequisites

To integrate your media app with Metisa:

1. **You must have a Metisa account.** Custom integrations are available to all Metisa users, whether you're on a Free or Paid tier. Sign up [here](https://askmetisa.com/create).
2. **You must have basic technical know-how.** You will be fine if you're comfortable navigating files and inserting code blocks, and some light coding with guidance.
3. **Your app must use a template rendering engine.** EJS, Liquid, Django are some examples. This installation rides on your app's template tags to obtain data to send to Metisa servers.

On the last point, if you are a developer, you may be able to customize the way data is sent to Metisa servers by fiddling with the [Metisa JavaScript SDK](https://github.com/altitudelabs/metisa-js).


## <a id="concepts"></a> Key concepts

Recommendations are made based on machine learning algorithms that feed on your app data like items (eg. articles), actions (eg. read), and users.

We therefore need a way for your app to automatically send such data to Metisa, so that over time (3-7 days depending on site traffic), Metisa will learn enough about your users' individual preferences to start providing good recommendations that get more accurate with time.

The way to achieve this is through inserting some JavaScript code into the page templates of your web app.


## <a id="install"></a> Install

> **TIP**: This section can be a little tricky.

> We encourage you to refer to our [demo movie recommendations app](https://github.com/altitudelabs/metisa-js) to see an example implementation.

There are two main steps to installing the scripts that enable custom integration.

1. [Embed site-wide code](#embed-site-wide-code)
2. [Embed template-specific code](#embed-template-code)

#### <a id="embed-site-wide-code"></a> Step 1: Embed site-wide code snippets

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
<script src="https://metisa-sdk.s3-ap-southeast-1.amazonaws.com/js/v0.0/metisa.js"></script>
```
#### <a id="embed-template-code"></a> Step 2: Embed template-specific code snippets

Next, you will need to embed code snippets into specific template files. One submits item data, and the other submits action data to Metisa.

**Sending Item data**

Let's start with the code that submits **item data** to Metisa.

Using the movie app as an example, individual movie data is sent to the Metisa server every time a user browses a movie on the app. That is why the **item template file** (ie. the file that shows details about a specific movie) is where you should place this code snippet, which sends data about that specific movie to Metisa.

With the code snippet in place, on every page load, the movie information is created or updated in the Metisa database.

```html
<script type="text/javascript">
  // Initialize the correct Metisa account to send data to
  mt('slug', '{{ metisa_account_slug }}');

  // Send movie data to Metisa
  mt('item', {
    id: '{{ movie_id }}',
    name: '{{ movie_name }}',
    maker: '{{ movie_director }}',
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

> **DETAIL**: For technical information about which fields are required, please refer to our [data schema](https://altitudelabs.github.io/metisa-js/doc/BROWSER/SCHEMA.html) specifications.

> **TIP**: You will see missing field errors in your browser console if there are any, to help you debug and send the right data.

**Sending Action data**

Now let's move on to submitting **action data** to Metisa.

An action refers to an event that is of importance to your app. For a news site, this might be a "read" event (in the past tense). For our [demo](https://github.com/altitudelabs/metisa-js) movie recommendations app, this might be a "heart" event, which the user uses to indicate interest in a particular movie.

For action data, you can embed a code snippet in either your **action-specific template**, **item template** or **list template**, depending on which page the event will be triggered.

Some examples:
* For an e-commerce store, the code snippet should be embedded in the order checkout template, which is an _action-specific template_ where customers view a summary of their order after payment
* For a news website, a "read" is triggered on the article page itself. Therefore the code snippet should be embedded in the _item template_

For our movie recommendation app, because the user is able to "heart" movies on the catalogue page, we embed the following code in the _list template_.

```html
<script type="text/javascript">
  // Initialize the correct Metisa account to send data to
  // (Skip this line if working in same file as item data)
  mt('slug', '{{ metisa_account_slug }}');

  // Send action data to Metisa
  mt('action', {
    id: '{{ action_id }}',
    user: {
      id: '{{ user_id }}',
      first_name: '{{ user_first_name }}',
      last_name: '{{ user_last_name }}',
      email: '{{ user_email }}'
    },
    line_items: [
      {
        variant_id: '{{ variant_id }}',
        item_id: '{{ item_id }}',
      }
    ]
  });
</script>
```

**Customizing Action trigger**

To customize _when_ this action will be triggered, you can wrap the action with your own JavaScript implementation. For example, if your app considers a user to have "read" an article when she has spent more than 15 seconds on the page, you can set a time delay before sending the request.

```js
// Example of adding 15s delay before submitting action data
setTimeout(function () {
  mt('action', { ... });
}, 15000);
```

> **DETAIL**: For technical information about which fields are required, please refer to our [data schema](https://altitudelabs.github.io/metisa-js/doc/BROWSER/SCHEMA.html) specifications.

> **TIP**: You will see missing field errors in your browser console if there are any, to help you debug errors.


## <a id="recommendations"></a> Embed your Metisa recommendations

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
