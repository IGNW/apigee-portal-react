#!/usr/bin/env bash

export APP_CONFIG_NAME=""
export EXPORT_TYPE=bash
export HELP=""

die() {
    printf '%s\n' "$1" >&2
    return 1
}

printUsage() {
    cat << EOF
usage: load-app-config [options]

Load Azure App Config into the environment

Options:
--help, show this text
--name, the name of the app config to load
--export-type, the export type to use. Must be 'bash', 'devops' or 'github' (default is $EXPORT_TYPE)
EOF
}

while [ "$#" -gt 0 ]; do
    case "$1" in
        --help) HELP="true" ;;
        --name)
            if [ "$2" ]; then 
                APP_CONFIG_NAME="${2}"
                shift
            else 
                die '[ERROR]: "--name" requires a non-empty argument.'
            fi
            ;;
        --name=?*)
            APP_CONFIG_NAME=${1#*=}  # Delete everything up to "=" and assign the remainder.
            ;;
        --name=)          # Handle the case of an empty --name=
            die '[ERROR]: "--name" requires a non-empty argument.'
            ;;
        --export-type)
            if [ "$2" ]; then 
                EXPORT_TYPE="${2%/}"
                shift
            else 
                die '[ERROR]: "--export-type" requires a non-empty argument.'
            fi
            ;;
        --export-type=?*)
            EXPORT_TYPE=${1#*=%/}
            ;;
        --export-type=)
            die '[ERROR]: "--export-type" requires a non-empty argument.'
            ;;
        -*) die "[FATAL]: unknown option: $1" ;;
    esac
    shift
done

if [[ -n "$HELP" ]]; then
    printUsage
    return 0;
fi

if [[ -z "${APP_CONFIG_NAME}" ]]; then
    printUsage
    return 0;
fi

if ! [[ "$EXPORT_TYPE" =~ ^(bash|devops|github)$ ]]; then
  echo "[ERROR]: --export-type must be 'bash', 'devops' or 'github'"
  return 1;
fi

echo "Fetching config data from app config $APP_CONFIG_NAME"
LIST=$(az appconfig kv list --name $APP_CONFIG_NAME --all --resolve-keyvault true)

echo $LIST | jq -c '.[]' | while read ITEM; do
    KEY=$(echo $ITEM | jq -r .key)
    VALUE=$(echo $ITEM | jq -r .value)

  if [[ "$EXPORT_TYPE" = "bash" ]]; then
    export $KEY="$VALUE"
  elif [[ "$EXPORT_TYPE" = "devops" ]]; then
    echo "##vso[task.setvariable variable=${KEY}]${VALUE}"
  else
    echo "$KEY=$VALUE" >> $GITHUB_ENV
  fi  
done