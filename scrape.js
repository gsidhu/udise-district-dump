import fs from 'fs';
import playwright from 'playwright';
let browser = await playwright.chromium.launch({ headless: true, acceptDownloads: true });
const page = await browser.newPage();

let url = "https://dashboard.udiseplus.gov.in/#/reportDashboard/sReport"

const TEACHERS_2002 = '.tabl-font > tr:nth-of-type(2) > td:nth-of-type(5) > img:nth-of-type(2)'
const SCHOOLS_3013 = '.tabl-font > tr:nth-of-type(3) > td:nth-of-type(5) > img:nth-of-type(2)'
const ENROLMENT_4002 = '.tabl-font > tr:nth-of-type(4) > td:nth-of-type(5) > img:nth-of-type(2)'

const CWSN_1006 = 'div > .card:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(6) > td:nth-of-type(5) > img:nth-of-type(2)'
const ROADS_1010 = 'div > .card:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(10) > td:nth-of-type(5) > img:nth-of-type(2)'

const ENROLMENT_4006 = 'div > .card:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(6) > td:nth-of-type(5) > img:nth-of-type(2)'
const CWNS_4007 = 'div > .card:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(7) > td:nth-of-type(5) > img:nth-of-type(2)'
const PROMOTION_4014 = 'div > .card:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(14) > td:nth-of-type(5) > img:nth-of-type(2)'

const TEACHER_2004 = 'div > .card:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(4) > td:nth-of-type(5) > img:nth-of-type(2)'
const TEACHER_2006 = 'div > .card:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(6) > td:nth-of-type(5) > img:nth-of-type(2)'
const TEACHER_2008 = 'div > .card:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(8) > td:nth-of-type(5) > img:nth-of-type(2)'
const TEACHER_2009 = 'div > .card:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(9) > td:nth-of-type(5) > img:nth-of-type(2)'
const TEACHER_2010 = 'div > .card:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(10) > td:nth-of-type(5) > img:nth-of-type(2)'
const TEACHER_2011 = 'div > .card:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > table > tr:nth-of-type(11) > td:nth-of-type(5) > img:nth-of-type(2)'

const STATE_DROPDOWN = '.modal-body > .row > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > select'
const DISTRICT_DROPDOWN = '.modal-body > .row > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > select'
const EXPORT_CSV = '.reportCard > li:nth-child(3) > img'

const exportPath = './exports/2004/'

async function pullData(url) {
    await page.goto(url)
    await page.waitForLoadState();

    // Open #2002
    await page.click(TEACHER_2004)
    await page.waitForTimeout(5000)

    for (var i=2;i < 39;i++) {
        await downloadData(page,i)
    }

    await browser.close();
}

async function downloadData(page, i) {
    // Set State
    let stateDropdown = await page.$(STATE_DROPDOWN)
    let STATE_NAME_SELECTOR = STATE_DROPDOWN + ' > option:nth-of-type(' + (i+1) + ')'
    let state = await page.$(STATE_NAME_SELECTOR)
    let stateName = await state.evaluate(element => element.innerText);
    await stateDropdown.selectOption({ index: i})
    await page.waitForTimeout(5000)

    // Set district dropdown
    let districtDropdown = await page.$(DISTRICT_DROPDOWN)
    await districtDropdown.selectOption({ index: 1})
    await page.waitForTimeout(5000)

    // Export data
    let [ download ] = await Promise.all([
        page.waitForEvent('download'), // wait for download to start
        page.click(EXPORT_CSV)
    ]);
    // save into the desired path
    let filePath = exportPath + 'district_' + stateName + '.xlsx'
    await download.saveAs(filePath);
    // wait for the download and delete the temporary file
    await download.delete()
}
pullData(url)