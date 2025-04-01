#!/bin/bash

# Flattens transforms
scour -i input.svg -o output.svg --enable-viewboxing --enable-id-stripping --enable-comment-stripping --shorten-ids --indent=none
