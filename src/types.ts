/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SearchResultItem {
  title: string;
  url: string;
  description: string;
  relevanceScore: string;
}

export interface FactItem {
  label: string;
  value: string;
}

export interface KnowledgePanelData {
  title: string;
  subtitle: string;
  description: string;
  facts: FactItem[];
}

export interface UnrelatedAdData {
  title: string;
  description: string;
  cta: string;
  url: string;
}

export interface SearchResponse {
  query: string;
  didYouMean: string;
  directAnswer: string;
  results: SearchResultItem[];
  knowledgePanel?: KnowledgePanelData;
  relatedSearches: string[];
  unrelatedAd: UnrelatedAdData;
}
