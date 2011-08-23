# hashbangify - make your node scripts executable!

## v0.1.0

## Installation

`hashbangify` is on `npm`:

     [sudo] npm install hashbangify -g

## Usage

Usage: `hashbangify myScript.js [interpreter]`

`interpreter` defaults to `node`.

This script will do several things.

- find where your interpreter is installed by calling `which`.
- read your target script into memory.
- delete it.
- open a new file with the same name, starting with the appropriate hashbang.
- write your target script back to the file.
- `chmod 0755` is then called prior to exit.
