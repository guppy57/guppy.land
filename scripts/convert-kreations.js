const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Read the data file
const dataFile = path.join(__dirname, '../export/production-export-2025-06-13t01-24-10-577z/data.ndjson');
const data = fs.readFileSync(dataFile, 'utf8');

// Parse each line as JSON
const kreations = data.split('\n')
  .filter(line => line.trim())
  .map(line => JSON.parse(line))
  .filter(item => item._type === 'kreation');

// Process each kreation
kreations.forEach(kreation => {
  // Create frontmatter
  const frontmatter = {
    id: kreation._id,
    name: kreation.name,
    description: kreation.description,
    email: kreation.email,
    founding_year: kreation.founding_year,
    status: kreation.status,
    tags: kreation.tags,
    url: kreation.url,
    created_at: kreation._createdAt,
    updated_at: kreation._updatedAt,
    icon: kreation.icon?._sanityAsset?.replace('image@file://./images/', '') || null,
    logo: kreation.logo?._sanityAsset?.replace('image@file://./images/', '') || null
  };

  // Convert frontmatter to YAML
  const yamlFrontmatter = yaml.dump(frontmatter);

  // Create markdown content
  const markdown = `---
${yamlFrontmatter}---

${kreation.brief || ''}`;

  // Create filename from name
  const filename = kreation.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') + '.md';

  // Write to file
  fs.writeFileSync(path.join(__dirname, '../kreations', filename), markdown);
});

console.log('Conversion complete!'); 