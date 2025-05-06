#!/bin/bash

ENV=$1
if [ -z "$ENV" ]; then
	echo "Usage: $0 <environment>"
	exit 1
fi

VISUAL="code --wait" bin/rails credentials:edit --environment "$ENV"