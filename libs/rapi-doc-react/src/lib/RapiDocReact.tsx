import 'rapidoc';

interface RapiDocProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  // General
  'spec-url': string;
  'update-route'?: boolean;
  'route-prefix'?: string;
  'sort-tags'?: boolean;
  'sort-endpoints-by'?: 'path' | 'method' | 'summary' | 'none';
  'heading-text'?: string;
  'goto-path'?: string;
  'fill-request-fields-with-example'?: boolean;
  'persist-auth'?: boolean;
  // UI Colors and Fonts
  theme?: 'light' | 'dark';
  'bg-color'?: string;
  'text-color'?: string;
  'header-color'?: string;
  'primary-color'?: string;
  'load-fonts'?: boolean;
  'regular-fonts'?: string;
  'mono-fonts'?: string;
  'font-size'?: 'default' | 'large' | 'largest';
  // Navigation
  'use-path-in-nav-bar'?: boolean;
  'nav-bg-color'?: string;
  'nav-text-color'?: string;
  'nav-hover-bg-color'?: string;
  'nav-hover-text-color'?: string;
  'nav-accent-color'?: string;
  'nav-item-spacing'?: 'default' | 'compact' | 'relaxed';
  // UI Layout & Placement
  layout?: 'row' | 'column';
  'render-style'?: 'read' | 'view' | 'focused';
  'on-nav-tag-click'?: 'expand-collapse' | 'show-description';
  'schema-style'?: 'tree' | 'table';
  'schema-expand-level'?: number;
  'schema-description-expanded'?: boolean;
  'schema-hide-read-only'?: 'always' | 'never' | string;
  'default-schema-tab'?: 'model' | 'example';
  'response-area-height'?: string;
  // Hide/Show Sections
  'show-info'?: boolean;
  'info-description-headings-in-navbar'?: boolean;
  'show-components'?: boolean;
  'show-header'?: boolean;
  'allow-authentication'?: boolean;
  'allow-spec-url-load'?: boolean;
  'allow-spec-file-load'?: boolean;
  'allow-spec-file-download'?: boolean;
  'allow-search'?: boolean;
  'allow-advanced-search'?: boolean;
  'allow-try'?: boolean;
  'allow-server-selection'?: boolean;
  'allow-schema-description-expand-toggle'?: boolean;
  // API Server & calls
  'server-url'?: string;
  'default-api-server'?: string;
  'api-key-name'?: string;
  'api-key-location'?: 'header' | 'query';
  'api-key-value'?: string;
  'fetch-credentials'?: 'omit' | 'same-origin' | 'include';
}

declare global {
  interface HTMLElementTagNameMap {
    'rapi-doc': HTMLDivElement;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'rapi-doc': RapiDocProps;
    }
  }
}

export const RapiDocReact: React.FC<RapiDocProps> = ({
  children,
  ...props
}: RapiDocProps) => {
  return <rapi-doc {...props}>{children}</rapi-doc>;
};

export default RapiDocReact;
