# TakeTwo Solution Starter - Chrome Extension

The TakeTwo Chrome browser extension is part of the Call for Code for Racial Justice TakeTwo Project. The extension is a plugin to facilitate the capture and categorization of words and phrases that could be racially biased through a browser.

The TakeTwo Chrome Javascript extension uses the [Highlighter Chrome extension](https://github.com/jeromepl/highlighter) library to allow the highlighter functionality for selecting text.

This extension is used to enable the crowdsourcing of data for use in training an ML model. This extension aims to make it as easy as possible for community members who would like to contribute to this initiative to do so quickly and privately.

## Description of TakeTwo Chrome Extension

An issue that was identified early on in trying to build a model that can detect racial bias was the lack of a dataset on racially biased words and phrases. In particular, there was a lack of data that could be used to detect subtle phrases within content.

The TakeTwo Chrome browser extension is a plugin to facilitate the capture and categorisation words and phrases that could be racially biased through a browser. The words and phrases can be categorized, as defined in our [API](https://github.com/Call-for-Code-for-Racial-Justice/taketwo-webapi/blob/main/README.md).

The words and phrases, along with their category, are sent to a backend database via an API. The data is used to train an ML text classification model on the significance of the context in which the language was used.

The extension intermittently serves an existing data record from the database to the user and asks them to highlight and classify any racial bias present. This can then be used to verify the merit of an existing mark, enhancing the reliability of the model.

### Data

The Chrome extension sends the following data to a backend database via an API:
- ``"flagged_string"``: *The word or phrase that has been highlighted by the user.*
- ``"category"``: *The category that has been selected for the type of racial bias present in the highlighted word or phrase.*
- ``"url"``: *The url from where the word or phrase was highlighted.*

This project has defined a number of categories of racial bias, which are used by a text classification model (outlined below). We welcome feedback on these:

- Appropriation
- Stereotyping
- Under-Representation
- Gaslighting
- Racial Slur
- Othering

Definitions of these categories can be found on the TakeTwo [webpage](https://github.com/Call-for-Code-for-Racial-Justice/TakeTwo/blob/main/README.md).

</br>

## Try out the extension

The following steps will explain how to get started with this extension.


### 1. Install the TakeTwo Chrome extension

You will need the Chrome browser, which can be installed [here](https://www.google.com/chrome/).


- Clone this git repo.
- In order to install the Chrome plugin, navigate to `chrome://extensions` and then select the **load unpacked** option.
- Navigate to the `src` folder in the cloned repo and `select`. You will now have the browser plug-in available to you.

### 2. Highlight text

When in webpage content where you find racially biased words or phrases that are not already highlighted, highlight and categorize them as follows:

- Click on the plugin icon in the top right Chrome toolbar.
- Click on 'Toggle cursor' to enter highlight mode. Your pointer will show as a highlighter pen.
![](/images/toggle-on.png)
- Highlight the word or phrase by pressing the left mouse button and moving along the text.
- Once highlighted, a bar showing the categories will appear. Select the most suitable category.
![](/images/highlight-extension-contrib.png)
- To turn off highlight mode, click on the plugin icon and 'Toggle Cursor'.
- As you highlight, your selections are saved. To delete them, select a highlight and delete using the trashcan icon.
![](/images/delete-single-contrib.png)
- Alternatively, you can "REMOVE ALL" via the drop-down. This will delete them from the backend database.
![](/images/remove-all.png)

## Contributing

We welcome contributions! For details on how to contributing please read the CONTRIBUTING.md file in this repo.

This project is still very much a work in progress, however our hope for the future is that this is a step towards a more informed media culture that is more aware of racial bias in media content. We hope this can be built out so that it can be used in a range of areas; news, social media, forums, code etc.

We also hope to expand the project to enable detection of racial bias in audio and video in the future.

We hope you will help us in this open source community effort:

- As a community member who can help with the data capture of words and phrases.
- As a developer to help us improve the extension design and functionality to accelerate this project forward. We have a range of features we would like help with in the issues section of this repo.

## Related Links

There are a number of other components related to this project:

- [TakeTwo Data Science](https://github.com/Call-for-Code-for-Racial-Justice/taketwo-datascience/blob/main/README.md) - Contains data science work for building and training the model.
- [TakeTwo WebAPI](https://github.com/Call-for-Code-for-Racial-Justice/taketwo-webapi/blob/main/README.md) - Code for the TakeTwo backend database.

## License

This solution starter is made available under the [MIT License](LICENSE).
