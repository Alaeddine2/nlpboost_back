# Tunav Taxi Server

<p align="center">
    <img alt="Parse Server" src="https://github.com/parse-community/parse-server/raw/master/.github/parse-server-logo.png" width="500">
  </a>
</p>

<p align="center">
  Parse Server is an open source backend that can be deployed to any infrastructure that can run Node.js.
</p>

<p align="center">
    <a href="https://twitter.com/intent/follow?screen_name=parseplatform"><img alt="Follow on Twitter" src="https://img.shields.io/twitter/follow/parseplatform?style=social&label=Follow"></a>
  <a href="https://travis-ci.org/parse-community/parse-server"><img alt="Build status" src="https://img.shields.io/travis/parse-community/parse-server/master.svg?style=flat"></a>
    <a href="https://codecov.io/github/parse-community/parse-server?branch=master"><img alt="Coverage status" src="https://img.shields.io/codecov/c/github/parse-community/parse-server/master.svg"></a>
    <a href="https://www.npmjs.com/package/parse-server"><img alt="npm version" src="https://img.shields.io/npm/v/parse-server.svg?style=flat"></a>
    <a href="https://community.parseplatform.org/"><img alt="Join the conversation" src="https://img.shields.io/discourse/https/community.parseplatform.org/topics.svg"></a>
    <a href="https://greenkeeper.io/"><img alt="Greenkeeper badge" src="https://badges.greenkeeper.io/parse-community/parse-server.svg"></a>
</p>

<p align="center">
    <img alt="MongoDB 3.6" src="https://img.shields.io/badge/mongodb-3.6-green.svg?logo=mongodb&style=flat">
    <img alt="MongoDB 4.0" src="https://img.shields.io/badge/mongodb-4.0-green.svg?logo=mongodb&style=flat">
</p>

# Parse Server

Parse Server works with the Express web application framework. It can be added to existing web applications, or run by itself.

The full documentation for Parse Server is available in the [wiki](https://github.com/parse-community/parse-server/wiki). The [Parse Server guide](http://docs.parseplatform.org/parse-server/guide/) is a good place to get started. An [API reference](http://parseplatform.org/parse-server/api/) and [Cloud Code guide](https://docs.parseplatform.org/cloudcode/guide/) are also available. If you're interested in developing for Parse Server, the [Development guide](http://docs.parseplatform.org/parse-server/guide/#development-guide) will help you get set up.

# Getting Started

The fastest and easiest way to get started is to run MongoDB and Parse Server locally.

## Installation

Install the server from `npm`.

```
npm i -g
```

You can launch the server with a single `command` like this:

```
npm run server
```
This will host the following 

    - server on: http://localhost:1337/parse
    - GraphQL URL: http://localhost:1337/graphql
    - Dashboard on: http://localhost:1337/dashboard

## Email verification and password reset

Verifying user email addresses and enabling password reset via email requires an email adapter. As part of the `parse-server` package we provide an adapter for sending email through `parse-smtp-template`.

## Live Queries

Live queries are meant to be used in real-time reactive applications, where just using the traditional query paradigm could cause several problems, like increased response time and high network and server usage. Live queries should be used in cases where you need to continuously update a page with fresh data coming from the database, which often happens in (but is not limited to) online games, messaging clients and shared to-do lists.

Take a look at [Live Query Guide](https://docs.parseplatform.org/parse-server/guide/#live-queries), [Live Query Server Setup Guide](https://docs.parseplatform.org/parse-server/guide/#scalability) and [Live Query Protocol Specification](https://github.com/parse-community/parse-server/wiki/Parse-LiveQuery-Protocol-Specification). You can setup a standalone server or multiple instances for scalability (recommended).

## GraphQL

[GraphQL](https://graphql.org/), developed by Facebook, is an open-source data query and manipulation language for APIs. In addition to the traditional REST API, Parse Server automatically generates a GraphQL API based on your current application schema. Parse Server also allows you to define your custom GraphQL queries and mutations, whose resolvers can be bound to your cloud code functions."# taxi_server" 
