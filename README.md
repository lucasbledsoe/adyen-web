# Adyen Web

With Adyen Web you can help your shoppers pay with a payment method of their choice. It provides you with the building blocks you need to create a checkout experience.

You can integrate with Adyen in two ways, Drop-in and Components.

> [Getting Started](https://docs.adyen.com/checkout/)

## Drop-in

Drop-in is our all-in-one UI solution that you can add on your payments form so you can start accepting transactions for key payment methods using a single front-end implementation.

The [Drop-in](https://docs.adyen.com/checkout/drop-in-web/) handles the presentation of available payment methods and the subsequent entry of a customer's payment details. It is initialized with the response of [`/paymentMethods`][apiexplorer.paymentmethods], and provides everything you need to make an API call to [`/payments`][apiexplorer.payments] and [`/payments/details`][apiexplorer.paymentsdetails].

> [Drop-in Documentation](https://docs.adyen.com/checkout/drop-in-web/)

## Components

We built separate Components per payment method that you can use to render UI for collecting your shopper's payment details.

Follow these instructions to load Components in your project:

> [Components Documentation](https://docs.adyen.com/checkout/components-web/)

> [Available Components](https://docs.adyen.com/checkout/supported-payment-methods)

## See also

-   [Complete Documentation](https://docs.adyen.com/checkout/)

-   [API Explorer](https://docs.adyen.com/api-explorer/)

-   [Adyen Components JS Sample Code](https://github.com/Adyen/adyen-components-js-sample-code)


## Development environment

Follow these steps to run our development playground:

* Clone [this repository](https://github.com/Adyen/adyen-web) and navigate to the root of the project.
* Create a `.env` file on your project's root folder following the example on `.env.default` and fill in the necessary environment variables.
* Install all dependencies by running:
```
$ yarn install
```

* Start the development playground. This will start a local server on [http://localhost:3020](http://localhost:3020).
```
yarn start
```

## Branch organization

We merge every pull request to the `master` branch. We aim to keep `master` in good shape, which allows us to release a new version whenever we need to.

## Support

If you have a feature request, or spotted a bug or a technical problem, create an issue here. For other questions, contact our [support team](https://support.adyen.com/hc/en-us/requests/new?ticket_form_id=360000705420).

## License

This repository is open source and available under the MIT license. For more information, see the LICENSE file.

[apiexplorer.paymentmethods]: https://docs.adyen.com/api-explorer/#/PaymentSetupAndVerificationService/v49/paymentMethods
[apiexplorer.payments]: https://docs.adyen.com/api-explorer/#/PaymentSetupAndVerificationService/v49/payments
[apiexplorer.paymentsdetails]: https://docs.adyen.com/api-explorer/#/PaymentSetupAndVerificationService/v49/paymentsDetails
