# UDISE District Dump

Scrapes data from the UDISE+ dashboard and generates a consolidated file for all states.

* `test.js` runs the crawler and downloads the exported XLSX files locally.
* `convert.sh` uses the [xlsx2csv](https://github.com/dilshod/xlsx2csv) script to convert to CSV.
* `aggregate.py` consolidates the data from individual CSVs to a single CSV.

The final XLSX output is sorted and cleaned manually.

## How to set up
You'll need to have npm or yarn installed on your machine. And Python 3.x.

1. Download this directory. Run `yarn` or `npm install` to install the node dependencies.
2. Download the `xlsx2csv.py` file from [here](https://github.com/dilshod/xlsx2csv) and place it in the root directory.
3. If you're on a UNIX system, run `chmod +x convert.sh` to make the shell script executable.

## How to use
1. Edit the `test.js` file based on your requirements. You'll have to set the CSS selector path for the report that you are looking to scrape. Edit the `downloadData` function as per your need. Be sure to set sufficient timeout values.
2. Run `node test.js`. It'll download the XLSX files in a new folder called **exports**.
3. Edit the path in the `convert.sh` file as per your downloaded report.
4. Run `./convert.sh`. It'll create CSV files for all the XLSX files in the same folder in **exports**.
5. Edit the path and final output filename in the `aggregate.py` file. You might have to twiddle around with it more based on what the downloaded reports look like.
6. Run `python aggregate.py`. It'll create a consolidated CSV file combining all the reports into one.

Lastly, open the output of #6 in Excel and modify it as you like.