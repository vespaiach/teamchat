#!/bin/bash

# Ensure rbenv is loaded
if ! command -v rbenv &> /dev/null; then
  echo "rbenv is not installed or not in PATH"
  exit 1
fi

# Get current Ruby version from rbenv
ruby_version=$(rbenv version-name)

# Get GEM_HOME from `gem env`
gem_home=$(gem env gemdir)

echo "Ruby version (rbenv): $ruby_version"
echo "Gem installation directory: $gem_home"
