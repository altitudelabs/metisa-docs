# Segmenting

### Overview

Sending relevant messages to customer segments is key to increasing engagement and sales. Filters let you create customer segments in a powerful, flexible and human-readable way. Here are some basic use cases to get you started:

<table class="table">
    <thead>
        <tr>
            <th class="col-md-8">Use Case</th>
            <th class="col-md-4">Filter</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Get at-risk customers</td>
            <td>tag_active = 'at_risk'</td>
        </tr>
        <tr>
            <td>Get customers with predicted customer lifetime value of more than $2000</td>
            <td>clv > 2000</td>
        </tr>
        <tr>
            <td>Get customers who made only one purchase</td>
            <td>no_of_purchases = 1</td>
        </tr>
        <tr>
            <td>Get customers who have not bought since 31 December 2015</td>
            <td>last_purchase < '2015-12-31'</td>
        </tr>
        <tr>
            <td>Get at-risk customers with customer lifetime value of $500 or more</td>
            <td>tag_active = 'at_risk' and clv >= 500</td>
        </tr>
        <tr>
            <td>Get customers in cluster 1 or 2</td>
            <td>cluster_id = 1 or cluster_id = 2</td>
        </tr>
        <tr>
            <td>Get customers who signed up yesterday</td>
            <td>first_signup = &#123;&#123;date:1d&#125;&#125;</td>
        </tr>
        <tr>
            <td>Get customers who bought less than 4 weeks ago</td>
            <td>last_purchase > &#123;&#123;date:4w&#125;&#125;</td>
        </tr>
    </tbody>
</table>

### Creating a basic filter

Use our filtering interface (Insight - Customers - Create Filter) to get a sense of how to create customer segments. You can get a good idea of how filters work by playing around.

![](/images/filtering/basic-filtering.png)

If you decide to venture into the advanced realm, read more below.

### Creating an advanced filter

#### Expressions

Expressions are the basic building block of a filter. They take the following form:

```
{{field}} {{operator}} {{value}}
```

For instance, in the expression below, last_purchase is the field, < is the operator and '2015-12-31' is the operator. This filters customers whose last purchase date is before 31 December 2015.

```
last_purchase < '2015-12-31'
```

Expressions can be chained using 'and' and 'or' operators and can be excluded using the 'not' operator.

Read more about [fields](#fields), [operators](#operators) and [values](#values).

#### Fields

Fields form part of an expression. You can filter on the following fields. Note that fields are only available if data is collected in your store.

<table class="table">
    <thead>
        <tr>
            <th class="col-md-2">Label</th>
            <th class="col-md-2">Field Name</th>
            <th class="col-md-8">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Age</td>
            <td>age</td>
            <td>Age of customer, if available.</td>
        </tr>
        <tr>
            <td>Churn</td>
            <td>churn_rate</td>
            <td>Probability (from 0 to 1) that a customer is at risk.</td>
        </tr>
        <tr>
            <td>CLV</td>
            <td>clv</td>
            <td>Predictive customer lifetime value, the expected present value of future purchases of a customer.</td>
        </tr>
        <tr>
            <td>First name</td>
            <td>first_name</td>
            <td>First name of a customer.</td>
        </tr>
        <tr>
            <td>First signup date</td>
            <td>first_signup</td>
            <td>Date that customer registered for store account.</td>
        </tr>
        <tr>
            <td>Gender</td>
            <td>gender</td>
            <td>M (male) or F (female), if available.</td>
        </tr>
        <tr>
            <td>Language</td>
            <td>language</td>
            <td>Language choice of a customer.</td>
        </tr>
        <tr>
            <td>Last name</td>
            <td>last_name</td>
            <td>Last name of a customer.</td>
        </tr>
        <tr>
            <td>Last purchase</td>
            <td>last_purchase</td>
            <td>Date of most recent purchase.</td>
        </tr>
        <tr>
            <td>Last signin date</td>
            <td>last_signin</td>
            <td>Date of most recent sign-in.</td>
        </tr>
        <tr>
            <td>Lifecycle</td>
            <td>tag_active</td>
            <td>Classifies customers into one-time (one_time), active (active), at-risk (at_risk) or lost (lost). A customer is considered active if his churn rate is less than 0.5, at-risk when between 0.5 and 0.9 and lost when more than 0.9.</td>
        </tr>
        <tr>
            <td>Number of purchases</td>
            <td>no_of_purchases</td>
            <td>Number of purchases a customer to date.</td>
        </tr>
        <tr>
            <td>Purchase status</td>
            <td>tag_purchase</td>
            <td>Classifies customers into newly registered (new_register) or existing customers (new_customer).</td>
        </tr>
        <tr>
            <td>Segment</td>
            <td>tag_segment</td>
            <td>Classifies customers into VIP (vip), core (core), customers with potential (potential) and non-core (non_core) customers according to our predictive segmentation algorithm.</td>
        </tr>
        <tr>
            <td>Total purchase amount</td>
            <td>total_purchase</td>
            <td>Total dollar value of purchases from a customer to date.</td>
        </tr>
    </tbody>
</table>

#### Operators

##### Overview

You can use the arithmetic operators such as equality (=), less than or equal to (<=), more than or equal to (>=), less than (<) and more than (>) to filter customers that meet certain criteria.

Here are a list of operators:

<table class="table">
    <thead>
        <tr>
            <th class="col-md-2">Operator</th>
            <th class="col-md-2">Symbol</th>
            <th class="col-md-8">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Equals</td>
            <td>=</td>
            <td>Equality.</td>
        </tr>
        <tr>
            <td>Equals (case insensitive)</td>
            <td>~=</td>
            <td>Case sensitive equality.</td>
        </tr>
        <tr>
            <td>Regex</td>
            <td>~~</td>
            <td>Checks if field matches regular expression.</td>
        </tr>
        <tr>
            <td>Greater than</td>
            <td>&gt;</td>
            <td>Strictly greater than.</td>
        </tr>
        <tr>
            <td>Greater than or equal</td>
            <td>&gt;=</td>
            <td>Greater than or equal to.</td>
        </tr>
        <tr>
            <td>Less than</td>
            <td>&lt;</td>
            <td>Strictly less than.</td>
        </tr>
        <tr>
            <td>Less than or equal</td>
            <td>&lt;=</td>
            <td>Less than or equal to.</td>
        </tr>
        <tr>
            <td>Contains</td>
            <td>contains</td>
            <td>Field contains a certain string.</td>
        </tr>
        <tr>
            <td>Contains (case insensitive)</td>
            <td>~contains</td>
            <td>Field contains a certain case-insensitive string.</td>
        </tr>
        <tr>
            <td>Starts with</td>
            <td>startswith</td>
            <td>Field starts with a certain string.</td>
        </tr>
        <tr>
            <td>Starts with (case insensitive)</td>
            <td>~startswith</td>
            <td>Field starts with a certain case-insensitive string.</td>
        </tr>
        <tr>
            <td>Ends with</td>
            <td>endswith</td>
            <td>Field ends with a certain string.</td>
        </tr>
        <tr>
            <td>Ends with (case insensitive)</td>
            <td>~endswith</td>
            <td>Field ends with a certain case-insensitive string.</td>
        </tr>
        <tr>
            <td>Is null</td>
            <td>isnull</td>
            <td>Field is null.</td>
        </tr>
    </tbody>
</table>

##### Chaining Operators

Often, you need to run complex queries that are the result of many expressions. You can chain two or more expressions using logical operators 'and' and 'or'. They work like logical operators in mathematics and you can use parenthesis () to indicate which expressions should be evaluated first.

##### Not Operator

You can use the 'not' operator to exclude the results of expressions. The 'not' operator appears in front of an expression, like so:

```not tag_active = 'active'```

The expression above filters customers who are not active.

#### Values

Values can be strings, numbers or dates.

##### Strings

Strings should be wrapped with apostrophes (') or double quotes (").

##### Numbers

Numbers are integers and decimals. They do not have to be wrapped in quotes.

##### Dates

Metisa supports four types of dates. Dates should be provided in the format below and text should be wrapped with apostrophes (') or double quotes (").

<table class="table">
    <thead>
        <tr>
            <th class="col-md-2">Type</th>
            <th class="col-md-6">Description</th>
            <th class="col-md-4">Format</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Date</td>
            <td>Dates with year (YYYY), month (MM) and day (DD) and no time component.</td>
            <td>"YYYY-MM-DD"</td>
        </tr>
        <tr>
            <td>Naive datetime</td>
            <td>Date with a time component in hours (HH), minutes (MM) and seconds (SS) but without a timezone component.</td>
            <td>"YYYY-MM-DDTHH:MM:SS"</td>
        </tr>
        <tr>
            <td>Timezone aware datetime</td>
            <td>Datetime with a specified timezone offset (+hh:mm).</td>
            <td>"YYYY-MM-DDTHH:MM:SS+hh:mm"</td>
        </tr>
        <tr>
            <td>Relative dates</td>
            <td>Specified number of days (d), weeks (w), months (m) or years (y) prior to today. e.g. &#123;&#123;date:4w&#125;&#125; returns the day 4 weeks prior to today.</td>
            <td>&#123;&#123;date:2y&#125;&#125;</td>
        </tr>
    </tbody>
</table>