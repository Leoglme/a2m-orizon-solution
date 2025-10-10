module.exports = {
    componentDirectory: 'storyblok', // Dossier pour définitions de components (facultatif)
    backupDirectory: 'backup',      // Dossier pour sauvegardes
    dryRun: true,                   // Active le mode dry-run
    oauthToken: "JUwOQl4gYQwrMHFAa5PyPAtt", // Token Management API
    spaceId: "287713124718434",       // ID du space source
    targetSpaceId: "287711486895708", // ID du space target
    targetOauthToken: "cEVXQyEfdp8Qtf2xaaSd3Qtt" // Token target
};
// l66DskvqwlJan180yx3QVgtt
// curl "https://api.storyblok.com//v1/spaces/287713124718434/assets/?token=JUwOQl4gYQwrMHFAa5PyPAtt&version=draft"
// curl "https://mapi.storyblok.com/v1/spaces/287713124718434/assets/" -H "Authorization: l66DskvqwlJan180yx3QVgtt"
