# Translation System Usage Guide

## Quick Start

### In Templates

Use the `t` pipe to translate any string:

```html
<!-- Simple translation -->
<h1>{{ 'apiaries.title' | t }}</h1>

<!-- Buttons -->
<button>{{ 'common.add' | t }}</button>
<button>{{ 'common.save' | t }}</button>

<!-- With parameters -->
<p>{{ 'auth.signedIn' | t:{ email: authEmail() } }}</p>
<p>{{ 'offline.banner' | t:{ changes: pendingCount() } }}</p>
```

### In Components

Inject the service and use the `t()` method:

```typescript
import { TranslationService } from '../../data/translation.service';

export class MyComponent {
  private i18n = inject(TranslationService);

  someMethod() {
    const title = this.i18n.t('apiaries.title');
    const message = this.i18n.t('offline.banner', { changes: 5 });
  }
}
```

## Language Management

### Get Current Language
```typescript
const lang = this.i18n.currentLang(); // signal
```

### Switch Language
```typescript
this.i18n.setLanguage('nl');
// or
this.i18n.setLanguage('en');
```

### List Supported Languages
```typescript
const langs = this.i18n.getSupportedLanguages(); // ['en', 'nl']
```

## Adding New Translations

### 1. Add keys to both JSON files

**public/assets/i18n/en.json**
```json
{
  "myfeature.title": "My Feature",
  "myfeature.description": "This is my feature"
}
```

**public/assets/i18n/nl.json**
```json
{
  "myfeature.title": "Mijn Functie",
  "myfeature.description": "Dit is mijn functie"
}
```

### 2. Use in templates
```html
<h2>{{ 'myfeature.title' | t }}</h2>
<p>{{ 'myfeature.description' | t }}</p>
```

## Current Translation Keys

All keys are organized by feature:

- `app.*` - Global app strings
- `common.*` - Common buttons/actions (Add, Save, Delete, etc.)
- `apiaries.*` - Apiary list feature
- `apiary.*` - Single apiary form
- `hives.*` - Hive list feature
- `hive.*` - Single hive form
- `inspections.*` - Inspection list feature
- `inspection.*` - Single inspection form
- `settings.*` - Settings page
- `auth.*` - Authentication strings
- `backup.*` - Backup/export strings
- `offline.*` - Offline mode messages
- `update.*` - App update messages

## Features

✅ Auto-detects browser locale on first load
✅ Stores language choice in localStorage
✅ Persists across app sessions
✅ Language switcher in header
✅ Parameter substitution for dynamic text
✅ Lazy loads translation files
✅ Fallback to English if translation missing
✅ No build-time steps needed

## Browser Support

- English (en) - Default fallback
- Dutch (nl) - Native Dutch speaker support
- Others auto-detect, then fallback to English

The browser's `navigator.language` is used to detect the locale.
