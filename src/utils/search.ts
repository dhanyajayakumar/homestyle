"use client";
import React, { useState, useEffect, useMemo } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import endpoints from "@/lib/endpoints";
import api from "@/lib/url";

const fetchProducts = async (query: string) => {
  const response = await fetch(
    `${api.defaults.baseURL}${endpoints.productListing}`
  );
  const products = await response.json();

  return products.filter((product: any) =>
    product.productTitle.toLowerCase().includes(query.toLowerCase())
  );
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;
  if (typeof query !== "string") {
    return res.status(400).json({ message: "Invalid query" });
  }

  try {
    const results = await fetchProducts(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
