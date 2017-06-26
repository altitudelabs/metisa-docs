# Magento Integration

This integration takes **5 minutes** to complete.

### Create Magento role

1.  In your Magento admin panel select the **System** tab and mouse-over **Web Services** and select **SOAP/XML-RPC-Roles**.
2.  When your page reloads, cpck **Add New Role**.
3.  Create a role with name **Metisa** and specify this user has access to all resources.
4.  Select **Role Resources** on the left and side. Set the resource access to all and then click **Save Role**.
![](/images/magento/magento-2.png)

### Create Magento user

1.  Create a new user to assign this role to. The **SOAP/XML-RPC - Users** item is above the **SOAP/XML-RPC - Roles** item in the **System** menu of the admin panel.
![](/images/magento/magento-3.png)

3.  Click **Add New User** and then fill in the user information. The fields can have any values you like. We recommend setting the User Name, First Name, and Last Name to Metisa and the email address to support@askmetisa.com. The API key you specify is equivalent to a password, so make sure it's secure.
4.  Once you've filled out the User Info section, click the **User Role** tab select the Metisa role you created earlier.
![](/images/magento/magento-4.png)

6.  When you have finished, click back to User Info and Save User. In doing so, a SOAP user is created to sync Magento order and customer data into Metisa.

### Add Magento integration

Add your Magento store in Metisa by providing the following fields:

*   **Shop URL**: URL of your Magento store
*   **Port number**: This should be 80 in most cases. If your store is hosted on a specific port number, specify that port number.
*   **Username**: From **Create Magento User** step above
*   **API key**: From **Create Magento User** step above

![](/images/magento/magento-5.png)

### Install Magento extension

Install our Magento extension that is designed to be used alongside your Metisa account. It installs a Javascript snippet to allow you to install on-site recommendation widgets on your Magento site from your Metisa account. It also installs a cookie that tracks customer behavior on your site so that recommendations can adapt as customers shop on your site.

Download our Magento extension [here](https://s3-ap-southeast-1.amazonaws.com/metisa/magento/metisa-magento-1.02.tgz).

Links to installation instructions for [Magento 1.x](https://www.cminds.com/down-to-the-basics-how-to-install-a-magento-extension) and [Magento 2.x](http://docs.magento.com/marketplace/user_guide/quick-tour/install-extension.html).

### Optimise API performance

To improve the performance of the Magento API (and speed up the data sync), we highly recommend enabling caching for the API configuration to boost the performance of the Magento API’s Metisa calls.

To do this, navigate to **System > Cache Management** in the Magento admin console. Enable caching on the two **Web Services Configuration** settings. If you make any changes to your Magento setup that could affect the configuration of these APIs (e.g. change your domain name), be sure to flush the caches, which can be done on this page as indicated below.

![](/images/magento/magento-6.png)