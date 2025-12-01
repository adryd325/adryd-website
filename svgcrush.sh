#!/usr/bin/env bash
scour -i $1.orig -o $1 --enable-viewboxing --enable-id-stripping --enable-comment-stripping --shorten-ids --indent=none
