# STARTAPP – Fil Rouge DWWM
Bienvenue dans le projet fil rouge de votre formation DWWM. Suivez les missions dans l'ordre pour construire pas à pas le site vitrine de la start-up fictive STARTAPP.

## [LE SITE](https://wolfyd3v.github.io/startapp-fil-rouge/)

## Quelques explications sur comment est structuré le dépôt:
Ce site a été programmé pour être hébergé avec Github pages. Dans le cas de test du responsive avoir un accès constant au site même quand j'ai pas accès à mon ordinateur est nécessaire.
De ce fait, le site a été développé pour fonctionner sur Github Pages, mais il marche aussi en local (du moins sur Linux, sur Windows je pense).
- Github Pages utilise de base Jekyll, mais ça casse un peu le site. Il ne charge plus les dossiers/fichiers qui commencent par "_" . Le fichier [.nojekyll](.nojekyll) empêche l'utilisation de Jekyll, donc ne casse plus le site
- Sur Github Pages, les chemins sont relatifs par rapport au dossier où le fichier qui appel une ressource se trouve
- Le site charge avec du JavaScript des composants HTML pré-défini. Pour eux, le chemin de la ressource qu'ils peuvent demander est relatif au fichier qui exécute l'appel

### Update - 18 nov. 2026
Les formulaires ont été mis à jour, les redirections lors du submit sont maintenant gérées par le JavaScript. Soit dans les scripts des pages qui possèdent un formulaires, et où ces derniers ne sont pas gérés par le form_script.js . Soit directement le form_script se charge des redirections comme un grand. Dans ce cas précis, la redirection qu'il va gérer est en second argument de la méthode d'initialisation d'un formulaire du form_script .
Les redirections vers la page des détails d'une prestation va toujours être ```prestations_details_page.html?prestation_id=1``` . Quelque soit le formulaire, et ce qu'il fait (donner un retour sur une prestaion, créer une prestation, etc).
