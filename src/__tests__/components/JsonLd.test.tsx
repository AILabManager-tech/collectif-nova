import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  JsonLd,
  localBusinessSchema,
  buildServiceSchema,
  buildFaqSchema,
} from "@/components/seo/JsonLd";

describe("JsonLd", () => {
  it("renders a script tag with correct type", () => {
    const { container } = render(<JsonLd data={localBusinessSchema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
  });

  it("renders valid JSON content", () => {
    const { container } = render(<JsonLd data={localBusinessSchema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const parsed = JSON.parse(script!.textContent!);
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("ProfessionalService");
    expect(parsed.name).toBe("Collectif Nova");
  });
});

describe("localBusinessSchema", () => {
  it("has required ProfessionalService fields", () => {
    expect(localBusinessSchema["@type"]).toBe("ProfessionalService");
    expect(localBusinessSchema.name).toBe("Collectif Nova");
    expect(localBusinessSchema.address).toBeDefined();
    expect(localBusinessSchema.serviceType).toHaveLength(4);
    expect(localBusinessSchema.knowsLanguage).toContain("fr");
    expect(localBusinessSchema.knowsLanguage).toContain("en");
  });

  it("has correct URL", () => {
    expect(localBusinessSchema.url).toBe("https://collectif-nova.vercel.app");
  });

  it("has correct address in Montreal", () => {
    expect(localBusinessSchema.address.addressLocality).toContain("Montr");
    expect(localBusinessSchema.address.addressRegion).toBe("QC");
  });
});

describe("buildServiceSchema", () => {
  it("builds French service schema", () => {
    const schema = buildServiceSchema("fr");
    expect(schema["@type"]).toBe("Service");
    expect(schema.serviceType).toContain("cr");
    expect(schema.hasOfferCatalog.itemListElement).toHaveLength(4);
  });

  it("builds English service schema", () => {
    const schema = buildServiceSchema("en");
    expect(schema.serviceType).toBe("Creative Services");
  });

  it("has correct provider name", () => {
    const schema = buildServiceSchema("fr");
    expect(schema.provider.name).toBe("Collectif Nova");
  });
});

describe("buildFaqSchema", () => {
  it("builds FAQPage schema from items", () => {
    const items = [
      { question: "Q1?", answer: "A1" },
      { question: "Q2?", answer: "A2" },
    ];
    const schema = buildFaqSchema(items);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]!["@type"]).toBe("Question");
    expect(schema.mainEntity[0]!.name).toBe("Q1?");
    expect(schema.mainEntity[0]!.acceptedAnswer.text).toBe("A1");
  });
});
