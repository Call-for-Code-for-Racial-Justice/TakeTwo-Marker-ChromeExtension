# Take 2 Chrome Extension

This repo is part of the [Embrace: Diverse Representation](https://github.com/Call-for-Code/Embrace-Diverse-Representation) stream and our focus is on problem statement 3. We decided to focus on the following two predefined hills:

1. A media content editor (e.g., audio, gaming, movies, tv, comics, news, publications) can incorporate bias detection and remediation into their creative process to reduce racial bias and improve representation to Gen Z.

2. A social media user can understand the historical and societal context of racial bias and cultural appropriation reflected in their posts in real time.

The Take 2 Chrome extension is part of an MVP for Call For Code (Emb-race). This extension is a method for facilitating the crowdsourcing of words and phrases in online content in order to generate data to a backend database. This data can then be used to train machine learning models for text-based workstreams.

One of the issues that has been identified is the lack of a data on racially biased words and phrases. In this case we use this extension to crowdsource words and phrases that could be racially biased and categorise them. The categories are defined in our [API](https://github.com/embrace-call-for-code/taketwo-webapi). 

It is still very much a work in progress, however our hope for the future is that this is a step towards a more informed media culture that is more aware of racial bias and toxic racism in media content. This is a proof of concept and we are open to ideas/suggestions which can be put forward using the issues section of this repo. We hope you will help us in this community effort:

- As a content contributor to enrich our data by installing the extension and using it.
- As a developer to help us improve the extension design and functionality to accelerate this project forward.


This extension uses the [Highlighter chrome extension](https://github.com/jeromepl/highlighter) library as a basis in order to allow the highlighter functionality for selecting text. 


## Start contributing to this project

The following steps will explain how to get started with contributing to our crowdsourced dataset of racially biased text. 


### 1. Install the Take 2 chrome extension

You will need the chrome browser, which can be installed [here](https://www.google.co.uk/chrome/?brand=CHBD&gclid=Cj0KCQjwjer4BRCZARIsABK4QeVAQkotXkLJlBvJS2V7R2q9__Gk3PchSyhorcBNAZXx7JJwbDeRrBYaAk3TEALw_wcB&gclsrc=aw.ds). 

In the future we hope this extension will be available via the chrome store, however for now you will need to install from a local directory. 

- Clone this git repo. 
- In order to install the chrome plugin, navigate to `chrome://extensions` and then select the **load unpacked** option. 
- Navigate to the repo folder and `select`. You will now have the browser plug-in available to you. 

### 2. Highlight text

When in webpage content where you find racially biased words or phrases that are not already highlighted, highlight and categorise them as follows:

- click on the plugin icon in the top right Chrome toolbar. 
- 'Toggle cursor' to enter highlight mode, your pointer will show as a highlighter pen.
- Highlight the word or phrase, by pressing the left mouse button, and moving along the text.
- Once highlighted a bar showing the categorisations will appear, select the appropriate category.
- To turn off highlight mode, click on the plugin icon and 'Toggle Cursor'.





