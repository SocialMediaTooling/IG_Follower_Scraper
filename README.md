## What is this?
This is a **Chrome Extension** to gather the followings/follwers for an Instagram account. Once the scraping for an account is complete, you will be prompted to save a JSON file of the data which is bascially just a text file with formatted data. It will have fields with values, and it will look something like:

```
{
  "account": "alaskaracing",
  "timestamp": "1719379748910",
  "pulledFollowingCount": 201,
  "pulledFollowersCount": 2450,
  "followers": [
    {
      "username": "xxxxx",
      "full_name": "Jane Doe"
    },
    ...],
   "followings": [
    {
      "username": "xxxxx",
      "full_name": "John Doe"
    },
    ...],
```

You can use this data to create maps and stuff.

> [!NOTE]
> **You need to be signed into Instagram** because of restrictions that they have placed on their public-facing API. It just won't work if you're logged out in that tab.

> [!WARNING]
> **Your account could be suspended for using this code**. **Set a delay** in this extension's settings to help avoid this. Instructions are at the end of this document.

> [!CAUTION]
> **I am not sure if this extension can handle accounts with 500k+ followers.** The reason being that Instagram might suspend your account mid-way through. If you need a scrape like that, try setting the delay to a high number. Again, instructions below! It will take some time, but it might work. I haven't tried it.



## How to install
[Instructions on installing the Chrome Extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world) (Scroll to "Load an unpacked extension" section, **OR** read the instructions below)
- You need to be using a Chrome browser.
- Download the files in this Github and unzip.
- Go to the Extensions page by entering `chrome://extensions` in a new tab in your Chrome browser.
  - Alternatively, click the Extensions menu puzzle button and select **Manage Extensions** at the bottom of the menu.
  - Or, click the Chrome menu, hover over **More Tools**, then select **Extensions**.
- Enable Developer Mode by clicking the toggle switch next to Developer mode.

<img src="https://github.com/SocialMediaTooling/IG_Follower_Scraper/assets/173634644/8a139534-5b5b-478f-a2f0-b6b988a698e2" alt="Chrome Extension settings page" width="400"/>

- Click the **Load unpacked button** and select the folder containing these Github files.

Ta-da! The extension has been successfully installed. Look for a black Instagram logo in your extensions by clicking on the Puzzle icon, and **pin it for easier access**.

## How to use
- Log into Instagram
- Navigate to the user's Instagram profile that you would like to scrape
- Click on the logo for the IG Scraper. This is easy to do if you've pinned the extension.
> [!NOTE]
> Need help pinning the extension? Click on the Puzzle icon in the top right corner of your browser, and find the IG Scraper extension in your Extensions list and click on it. Set your own settings, like the delay inbetween requests. A higher delay will lower the odds that your account will be suspended, but it will mean that the scrape will take longer. How long is based on a multiplier of the followers/followings and the delay set. The delay is in milliseconds. So 1000 milliseconds equates to 1 second. Again I do not know what a good delay is.
- When it is finished, it will ask you to save a JSON file containing the data. This is a bones text file with the scraped data formatted above at the top of this document. It has some metadata about the details of the scraping, and it has an array, or list, of the follower's username and display name.
  
> [!WARNING]
> **Make sure that the tab stays in the foreground while the code scrapes.** Just have a standalone window for the scrapes to run in while you browse and do whatever you want in another window. Just make sure it doesn't get backgrounded. You can check the Network tab in Dev Tools to see the Instagram queries running.

> [!NOTE]
> If something goes wrong, just refresh the browser and try it again. Sometimes downstream errors happen, but it should be rare. Sometimes the code doesn't run right away and you might need to click the scrape button twice. I gotta figure that one out.


> [!NOTE]
> The amount of time that it takes to complete the scrape is proportional to how big the accounts's following/follower counts are. Test the tool on an account with less following/followers counts first to see how it works.


## Demo
> [!NOTE]
> In this video, I use Chrome DevTools to check the Network activity. Right click -> Inspect, and make sure to look at the Network tab to watch the queries run. This serves as a progress checker. You will see the delay in action here.


https://github.com/SocialMediaTooling/IG_Follower_Scraper/assets/173634644/d1d1601b-9e57-4598-9315-5169c83f0729


For accounts between 1k-20k followers/followings it can take a few minutes or more depending on your internet connectivity and the delay. Video ends with us saving the file and opening it to look at the metadata collected.

> [!NOTE]
> **Add a delay** in the Extension options to try to prevent your accounts being suspended. I don't know the ideal time yet. In the video I demo a 1s delay. I sped the video up greatly but the actual scrape in this demo took a few minutes of letting these queries run.
 
> [!NOTE]
> If you want to ignore scraping the followers or followings for an account, you can specify that with the checkboxes in the dropdown after clicking on the IG Scraper extension. Those fields will show up as empty in the JSON file and those queries won't run so it'll be quicker.


















