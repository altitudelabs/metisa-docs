---
meta_title: Personalization for Magento
description: How to install Metisa for Magento for recommendation widgets, personalized emails and predictive customer analytics
---

# Magento Integration

This integration takes **5 minutes** to complete.

### Create Magento role

1.  In your Magento admin panel select the **System** tab and mouse-over **Web Services** and select **SOAP/XML-RPC-Roles**.
2.  When your page reloads, click **Add New Role**.
3.  Create a role with name **Metisa** and specify this user has access to all resources.
4.  Select **Role Resources** on the left and side. Set the resource access to all and then click **Save Role**.
![](/images/magento/magento-2.png)

### Create Magento user

1.  Create a new user to assign this role to. The **SOAP/XML-RPC - Users** item is above the **SOAP/XML-RPC - Roles** item in the **System** menu of the admin panel.
![](/images/magento/magento-3.png)

3.  Click **Add New User** and then fill in the user information. The fields can have any values you like. We recommend setting the User Name, First Name, and Last Name to Metisa and the email address to support@askmetisa.com.
4.  Once you've filled out the User Info section, click the **User Role** tab select the Metisa role you created earlier. Note that you're supposed to generate your own API key. It's like a password, so make sure it's secure.
![](/images/magento/magento-4.png) 

6.  When you have finished, click back to User Info and Save User. In doing so, a SOAP user is created to sync Magento order and customer data into Metisa.

### Add Magento integration

Add your Magento store in Metisa by providing the following fields:

*   **Shop URL**: URL of your Magento store
*   **Username**: From **Create Magento User** step above
*   **API key**: From **Create Magento User** step above

![](/images/magento/magento-5.png)

### Install Magento extension

Install our Magento extension that is designed to be used alongside your Metisa account. It installs a Javascript snippet to allow you to install on-site recommendation widgets on your Magento site from your Metisa account. It also installs a cookie that tracks customer behavior on your site so that recommendations can adapt as customers shop on your site.

Download our Magento extension [here](https://s3-ap-southeast-1.amazonaws.com/metisa/magento/Metisa_Tracking-1.0.2.tgz).

Links to installation instructions for [Magento 1.x](https://www.cminds.com/down-to-the-basics-how-to-install-a-magento-extension) and [Magento 2.x](http://docs.magento.com/marketplace/user_guide/quick-tour/install-extension.html).

### Optimise API performance

To improve the performance of the Magento API (and speed up the data sync), we highly recommend enabling caching for the API configuration to boost the performance of the Magento API’s Metisa calls.

To do this, navigate to **System > Cache Management** in the Magento admin console. Enable caching on the two **Web Services Configuration** settings. If you make any changes to your Magento setup that could affect the configuration of these APIs (e.g. change your domain name), be sure to flush the caches, which can be done on this page as indicated below.

![](/images/magento/magento-6.png)

### You have integrated - What's next?

Congratulations, that was all you need to do to get set up with Metisa! So, what now?

The moment you successfully integrated, Metisa has started to work on your data, running machine learning algorithms to make sense of your customers. This **analyzing process usually takes less than 15 minutes**, but depending on the amount of data you have (ie. number of sales transactions, customers, products), it can sometimes take up to an hour to finish the process.

Check back in an hour and your Metisa dashboard should be ready to help you supercharge your e-commerce sales. You can login to your Metisa dashboard [here](https://askmetisa.com/login).
