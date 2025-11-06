#!/bin/bash
# Ensure permissions and clean install
npm ci
npm rebuild vite
npm run build
