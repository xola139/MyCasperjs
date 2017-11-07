#!/bin/bash

parallel --bar -a links.txt casperjs getImagetwitt.js
cat scraped_data/*.txt > elements.txt
