# Assets Fallback Strategy and Folder Overview

This document explains the fallback strategy for assets used in this project, including details about the folder structure and how the alternate asset-loading mechanism works.

## Overview

The project is designed with robust asset management in mind. We use a fallback chain to ensure that if an asset fails to load from its primary source, alternate sources are automatically tried. The primary assets are stored in the `/assets/f/` folder, and a backup copy of these assets is available in the `/assets/materials/` folder. Note that the files in the `materials` folder are exact copies from the `f` folder but may not always correspond exactly to the naming convention or dimensions indicated by their filenames.

This redundancy ensures that even if the browser encounters an error (or if the asset query fails for any reason), the script in `index.html` will automatically try subsequent URLs to find a valid asset.

## Fallback Chain Strategy

For each asset, a **fallback chain** is defined. This chain is an ordered list of URLs that the asset-checker script will try until a valid asset is found. For example, consider the fallback chain for the `favicon32` asset:

```javascript
{
  id: "favicon32",
  fallbackChain: [
    "https://kvnbbg-creations.io/assets/f/favicon-32x32.png",
    "https://kvnbbg-creations.io/assets/materials/favicon-32x32.png",
    "https://source.unsplash.com/random/32x32/?icon",
    "https://picsum.photos/32/32"
  ]
}
```

### Explanation of the Fallback Chain:

1. **Primary Source:**  
   - **URL:** `https://kvnbbg-creations.io/assets/f/favicon-32x32.png`  
   - This is the first URL the script attempts. It points to the asset in the `/assets/f/` folder.

2. **Local Backup (Materials Folder):**  
   - **URL:** `https://kvnbbg-creations.io/assets/materials/favicon-32x32.png`  
   - If the primary URL fails (e.g., due to network issues or a missing file), the script tries the copy in the `/assets/materials/` folder.  
   - **Note:** Files in this folder are duplicates of those in the `f` folder and may not always reflect the exact size indicated in their filenames. They serve as a backup.

3. **External Fallback – Unsplash Query:**  
   - **URL:** `https://source.unsplash.com/random/32x32/?icon`  
   - If both local options fail, the script queries Unsplash to return a random image of size 32x32 matching the "icon" search term.

4. **External Fallback – Picsum Query:**  
   - **URL:** `https://picsum.photos/32/32`  
   - As a final fallback, the script queries Picsum to retrieve a random placeholder image with the requested dimensions.

## How It Works

When the browser loads the page, the JavaScript in the `<head>` (in `index.html`) executes the asset-checking script. This script:

1. **Iterates Through the Fallback Chain:**  
   For each asset, the script attempts to load the asset from the first URL in the chain. If it fails, it moves to the next URL, and so on.

2. **Handles Discrepancies:**  
   If the contents of the `/assets/materials/` folder do not exactly match the expected dimensions or names (since they are a backup copy of the `/assets/f/` folder), the script will still attempt to load the asset from that location before moving on to the external sources.

3. **Ensures Visual Integrity:**  
   This strategy guarantees that the website remains visually intact, even if some assets are missing or fail to load, by dynamically providing a working asset from one of the specified fallback sources.

## Recommendations for Future Maintenance

- **Keep Folders in Sync:**  
  Although the `materials` folder is a backup, it’s recommended to update it whenever changes are made in the `f` folder.

- **Monitor External Sources:**  
  External query-based URLs (from Unsplash and Picsum) may change over time. Regularly verify that these services still provide the expected assets.

- **Customize Fallback Chains:**  
  When adding new assets or modifying existing ones, ensure that the corresponding fallback chains are updated with the correct URLs and in the proper order of priority.

## Conclusion

This asset fallback strategy provides a robust mechanism for ensuring that your website's assets are always available, even under adverse conditions. By combining local backups with external dynamic sources, the project ensures a consistent and reliable user experience.

For any questions or further improvements, please feel free to contact the repository maintainer.

---

*This document is part of the repository for the [Personal Portfolio](https://github.com/Kvnbbg/PersonalPortfolio).*
