# Regeln

## Struktur

Ordner und Dateien sind auf **Englisch** zu benennen.\
Es steht frei, ob Groß- oder Kleinschreibung verwendet wird.

## Commits

Commit-Nachrichten sind auf **Englisch** zu verfassen.\
Die Nachricht muss eine aussagekräftige Kurzbeschreibung sowie das zugehörige Issue enthalten.

Der Text der Nachricht ist im Imperativ zu schreiben und soll das folgende Satzkonstrukt vervollständigen:\
"_If this commit/patch is applied, it will [Commit-Nachricht]_"\
Beispiel: "_If this commit is applied, it will [add config files]_"
     
> Describe your changes in imperative mood, e.g. "make xyzzy do frotz" instead of "[This patch] makes xyzzy do frotz" or "[I] changed xyzzy to do frotz", **as if you are giving orders to the codebase to change its behavior**.
> -- [git.kernel.org](https://git.kernel.org/pub/scm/git/git.git/tree/Documentation/SubmittingPatches?id=HEAD#n133)

## Issue-Board

Das Issue-Board ist aktiv zu pflegen.\
Das Anlegen neuer Issues erfolgt durch das jeweilig zuständige Team.\
Bei Erstellung sind Zuständigkeiten festzulegen, wer für das Issue verantwortlich ist.\
Für jedes Issue erfolgt vor Abschluss ein Review durch den Projektleiter.\
Ein Issue gilt erst dann als abgeschlossen, wenn es als 'Done' markiert ist.
 
## Tests

Es sind direkt zu Beginn Tests für jedes Feature zu definieren.\
Die Durchführung der Testfälle erfolgt mit Hilfe von _Travis CI_.
 
## Branches & Merges

Für jedes Feature ist ein Branch anzulegen, der einen aussagekräftigen Namen erhält und dem Namensschema **feature/[Feature-Name]** folgt.\
Merges in den Master-Branch erfolgen nur wenn:
 - _Travis CI_ erfolgreich alle Testfälle durchlaufen hat und
 - ein positives Review durch den Projektleiter erfolgt ist.

## Ansprechpartner

 - Projektleiter: Jan-Hendrik Sünderkamp
 - Kommunikation & Travis CI: Tim Goebel
 - Kubernetes: Louis Steinkamp