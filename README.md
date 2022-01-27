# UDISE District Dump

Scrapes data from the UDISE+ dashboard and generates a consolidated file for all states.

* `test.js` runs the crawler and downloads the exported XLSX files locally.
* `convert.sh` uses the [xlsx2csv](https://github.com/dilshod/xlsx2csv) script to convert to CSV.
* `aggregate.py` consolidates the data from individual CSVs to a single CSV.

The final XLSX output is sorted and cleaned manually.
