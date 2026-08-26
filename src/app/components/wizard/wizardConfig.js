import { PROVIDER_URLS } from '@/lib/providerAvailability';

export const getTmdbWizardStepsConfig = (t) => [
  {
    title: t('about.docs_wizard.tmdb.title') || 'TMDb API Integration',
    description: t('about.docs_wizard.tmdb.desc') || 'TMDb is a free movie and TV show database...',
  },
  {
    title: t('about.docs_wizard.tmdb.step_signup') || 'Create an Account',
    description: t('about.docs_wizard.tmdb.step_signup_desc') || 'First, create a free account...',
    links: [{ label: t('about.docs_wizard.tmdb.step_signup_btn') || 'Open TMDb Registration', url: `${PROVIDER_URLS.TMDB}/signup` }],
    image: 'documentations/apis/tmdb1.PNG',
  },
  {
    title: t('about.docs_wizard.tmdb.step_email') || 'Receive Activation Email',
    description: t('about.docs_wizard.tmdb.step_email_desc') || 'Check your inbox...',
    image: 'documentations/apis/tmdb2.PNG',
  },
  {
    title: t('about.docs_wizard.tmdb.step_activate') || 'Activate Your Account',
    description: t('about.docs_wizard.tmdb.step_activate_desc') || 'Click on the activation button...',
    image: 'documentations/apis/tmdb3.PNG',
  },
  {
    title: t('about.docs_wizard.tmdb.step_login') || 'Log In to TMDb',
    description: t('about.docs_wizard.tmdb.step_login_desc') || 'Log in using your account details...',
    links: [{ label: t('about.docs_wizard.tmdb.step_login_btn') || 'Open TMDb Login', url: `${PROVIDER_URLS.TMDB}/login` }],
    image: 'documentations/apis/tmdb4.PNG',
  },
  {
    title: t('about.docs_wizard.tmdb.step_api') || 'Request an API Key',
    description: t('about.docs_wizard.tmdb.step_api_desc') || 'After logging in, go to the API request page...',
    links: [{ label: t('about.docs_wizard.tmdb.step_api_btn') || 'Open API Request Page', url: `${PROVIDER_URLS.TMDB}/settings/api/request` }],
    image: 'documentations/apis/tmdb5.png',
  },
  {
    title: t('about.docs_wizard.tmdb.step_terms') || 'Accept Terms of Service',
    description: t('about.docs_wizard.tmdb.step_terms_desc') || 'Check the box and click the blue button...',
    image: 'documentations/apis/tmdb6.PNG',
  },
  {
    title: t('about.docs_wizard.tmdb.step_details') || 'Fill in Application Details',
    description: t('about.docs_wizard.tmdb.step_details_desc') || 'Fill out this form to request your API key...',
    image: 'documentations/apis/tmdb7.PNG',
    quickFillItems: [
      { label: 'Application Name', value: 'my movie app' },
      { label: 'Application URL', value: 'https://www.mymovieapp.com' },
      { label: 'Application Summary', value: 'My application will show the beautiful posters and backdrops for me!', span: 2 },
      { label: 'First Name', value: 'Movie' },
      { label: 'Last Name', value: 'Maniac' },
      { label: 'Email', value: 'moviemaniac77@gmail.com', noCopy: true },
      { label: 'Phone', value: '+36 70 666 7777' },
      { label: 'Address 1', value: 'Movie Street 77', span: 2 },
      { label: 'City', value: 'Movie City' },
      { label: 'State', value: 'Movie State' },
      { label: 'Zip Code', value: '7777' },
    ],
  },
  {
    title: t('about.docs_wizard.tmdb.step_access') || 'Access API Key Details',
    description: t('about.docs_wizard.tmdb.step_access_desc') || 'Click on the highlighted link...',
    image: 'documentations/apis/tmdb8.PNG',
  },
  {
    title: t('about.docs_wizard.tmdb.step_save') || 'Save to SWAYA',
    description: t('about.docs_wizard.tmdb.step_save_desc') || 'Copy your API key...',
    image: 'documentations/apis/tmdb9.PNG',
    fields: [
      {
        key: 'tmdb_api_key',
        label: t('about.docs_wizard.tmdb.label_key') || 'TMDb API Key',
        placeholder: t('about.docs_wizard.tmdb.placeholder_key') || 'API Key...',
      },
      {
        key: 'tmdb_bearer_token',
        label: t('about.docs_wizard.tmdb.label_token') || 'TMDb Read Access Token',
        multiline: true,
        placeholder: t('about.docs_wizard.tmdb.placeholder_token') || 'Long bearer token...',
      },
    ],
    saveFieldMap: { tmdb_api_key: 'tmdb_api_key', tmdb_bearer_token: 'tmdb_bearer_token' },
  },
];

export const getOmdbWizardStepsConfig = (t) => [
  {
    title: t('about.docs_wizard.omdb.title') || 'OMDb API Integration',
    description: t('about.docs_wizard.omdb.desc') || 'OMDb API allows SWAYA to download...',
  },
  {
    title: t('about.docs_wizard.omdb.step_req') || 'Request an API Key',
    description: t('about.docs_wizard.omdb.step_req_desc') || 'Go to the OMDb request page...',
    links: [{ label: t('about.docs_wizard.omdb.step_req_btn') || 'Open OMDb API Key Request Page', url: 'http://www.omdbapi.com/apikey.aspx' }],
    image: 'documentations/apis/omdb1.PNG',
    quickFillItems: [
      { label: 'First Name', value: 'Movie' },
      { label: 'Last Name', value: 'Maniac' },
      { label: 'Email', value: 'Use your registered email', noCopy: true },
      { label: 'Use', value: 'Checking imdb, rotten, and meta movie ratings.', span: 2 },
    ],
  },
  {
    title: t('about.docs_wizard.omdb.step_email') || 'Receive Activation Email',
    description: t('about.docs_wizard.omdb.step_email_desc') || 'Check your inbox...',
    image: 'documentations/apis/omdb2.PNG',
  },
  {
    title: t('about.docs_wizard.omdb.step_save') || 'Activate & Save',
    description: t('about.docs_wizard.omdb.step_save_desc') || 'Open your email...',
    image: 'documentations/apis/omdb3.PNG',
    fields: [
      {
        key: 'omdb_api_key',
        label: t('about.docs_wizard.omdb.label_key') || 'OMDb API Key',
        type: 'password',
        placeholder: t('about.docs_wizard.omdb.placeholder_key') || 'OMDb API Key...',
      },
    ],
    saveFieldMap: { omdb_api_key: 'omdb_api_key' },
  },
];

export const getStashdbWizardStepsConfig = (t) => [
  {
    title: t('about.docs_wizard.stashdb.step_intro') || 'StashDB Integration',
    description: t('about.docs_wizard.stashdb.step_intro_desc') || 'StashDB is a community adult metadata database...',
  },
  {
    title: t('about.docs_wizard.stashdb.step_register') || 'Create an Account',
    description: t('about.docs_wizard.stashdb.step_register_desc') || 'Register a new account at StashDB...',
    links: [
      { label: t('about.docs_wizard.stashdb.step_register_btn') || 'Open StashDB Registration', url: `${PROVIDER_URLS.STASHDB}/register` },
      { label: t('about.docs_wizard.stashdb.step_register_admins') || 'Contact StashDB Admins', url: 'https://discourse.stashapp.cc/g/stashdb_admins' },
    ],
    quickFillItems: [
      { label: 'Invite Code A', value: 'dd9e5e76-fbd4-466c-ad96-296803275bb6' },
      { label: 'Invite Code B', value: '268df3a7-87cb-45bd-9ccf-d9a8bf2fee93' },
    ],
  },
  {
    title: t('about.docs_wizard.stashdb.step_activate') || 'Activate Your Profile',
    description: t('about.docs_wizard.stashdb.step_activate_desc') || 'Open the verification email...',
  },
  {
    title: t('about.docs_wizard.stashdb.step_save') || 'Retrieve your API Key',
    description: t('about.docs_wizard.stashdb.step_save_desc') || 'Log in and copy API key...',
    fields: [
      {
        key: 'stashdb_endpoint',
        label: t('about.docs_wizard.stashdb.label_endpoint') || 'StashDB API Endpoint',
        placeholder: t('about.docs_wizard.stashdb.placeholder_endpoint') || 'API Endpoint...',
      },
      {
        key: 'stashdb_api_key',
        label: t('about.docs_wizard.stashdb.label_key') || 'StashDB API Key',
        type: 'password',
        placeholder: t('about.docs_wizard.stashdb.placeholder_key') || 'StashDB API Key...',
      },
    ],
    saveFieldMap: { stashdb_api_key: 'stashdb_api_key', stashdb_endpoint: 'stashdb_endpoint' },
  },
];

export const getFansdbWizardStepsConfig = (t) => [
  {
    title: t('about.docs_wizard.fansdb.step_intro') || 'FansDB Integration',
    description: t('about.docs_wizard.fansdb.step_intro_desc') || 'FansDB is an invite-only crowdsourced metadata database...',
  },
  {
    title: t('about.docs_wizard.fansdb.step_apply') || 'Apply for Membership',
    description: t('about.docs_wizard.fansdb.step_apply_desc') || 'FansDB is currently invite-only...',
    links: [{ label: t('about.docs_wizard.fansdb.step_apply_btn') || 'Open FansDB Application Form', url: 'https://cryptpad.fr/form/#/2/form/view/qsc+HomZkJmjfQp0QRTDhN8JHgVt35pl1tG2n06Gy5o/embed/' }],
  },
  {
    title: t('about.docs_wizard.fansdb.step_register') || 'Register on FansDB',
    description: t('about.docs_wizard.fansdb.step_register_desc') || 'Once you receive your invite code...',
    links: [{ label: t('about.docs_wizard.fansdb.step_register_btn') || 'Open FansDB Registration', url: `${PROVIDER_URLS.FANSDB}/register` }],
  },
  {
    title: t('about.docs_wizard.fansdb.step_save') || 'Retrieve your API Key',
    description: t('about.docs_wizard.fansdb.step_save_desc') || 'Log in and copy API key...',
    fields: [
      {
        key: 'fansdb_endpoint',
        label: t('about.docs_wizard.fansdb.label_endpoint') || 'FansDB API Endpoint',
        placeholder: t('about.docs_wizard.fansdb.placeholder_endpoint') || 'API Endpoint...',
      },
      {
        key: 'fansdb_api_key',
        label: t('about.docs_wizard.fansdb.label_key') || 'FansDB API Key',
        type: 'password',
        placeholder: t('about.docs_wizard.fansdb.placeholder_key') || 'FansDB API Key...',
      },
    ],
    saveFieldMap: { fansdb_api_key: 'fansdb_api_key', fansdb_endpoint: 'fansdb_endpoint' },
  },
];

export const getTheporndbWizardStepsConfig = (t) => [
  {
    title: t('about.docs_wizard.theporndb.step_intro') || 'ThePornDB Integration',
    description: t('about.docs_wizard.theporndb.step_intro_desc') || 'ThePornDB integration lets you fetch studio scene metadata...',
  },
  {
    title: t('about.docs_wizard.theporndb.step_register') || 'Create an Account',
    description: t('about.docs_wizard.theporndb.step_register_desc') || 'Go to the registration page...',
    links: [{ label: t('about.docs_wizard.theporndb.step_register_btn') || 'Open ThePornDB Registration', url: `${PROVIDER_URLS.THEPORNDB}/register` }],
  },
  {
    title: t('about.docs_wizard.theporndb.step_token') || 'Generate API Token',
    description: t('about.docs_wizard.theporndb.step_token_desc') || 'Navigate to the API Tokens page...',
    links: [{ label: t('about.docs_wizard.theporndb.step_token_btn') || 'Open ThePornDB API Tokens Page', url: `${PROVIDER_URLS.THEPORNDB}/user/api-tokens` }],
  },
  {
    title: t('about.docs_wizard.theporndb.step_save') || 'Copy Token & Save',
    description: t('about.docs_wizard.theporndb.step_save_desc') || 'A popup window will display your new token...',
    fields: [
      {
        key: 'theporndb_endpoint',
        label: t('about.docs_wizard.theporndb.label_endpoint') || 'ThePornDB API Endpoint',
        placeholder: t('about.docs_wizard.theporndb.placeholder_endpoint') || 'API Endpoint...',
      },
      {
        key: 'theporndb_api_key',
        label: t('about.docs_wizard.theporndb.label_key') || 'ThePornDB API Key',
        type: 'password',
        placeholder: t('about.docs_wizard.theporndb.placeholder_key') || 'ThePornDB API Key...',
      },
    ],
    saveFieldMap: { theporndb_api_key: 'theporndb_api_key', theporndb_endpoint: 'theporndb_endpoint' },
  },
];

export const getOfflineWizardStepsConfig = (t) => [
  {
    title: t('about.docs_wizard.offline.step_single_title') || 'Local Offline Scan Capabilities',
    description: t('about.docs_wizard.offline.step_single_desc') || 'SWAYA works fully offline without any API keys...',
  },
];
