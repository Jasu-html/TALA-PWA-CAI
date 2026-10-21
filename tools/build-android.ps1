param(
  [string]$SdkPath = "$env:LOCALAPPDATA\Android\Sdk",
  [string]$JdkPath = "$env:ProgramFiles\Java\jdk-21"
)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
if (-not (Test-Path -LiteralPath "$SdkPath\platforms\android-36\android.jar")) {
  throw 'Android SDK platform 36 is required. Install it with Android Studio SDK Manager.'
}
if (-not (Test-Path -LiteralPath "$JdkPath\bin\java.exe")) {
  throw 'Java 21 is required. Pass -JdkPath with your JDK directory.'
}
if (-not (Test-Path -LiteralPath "$projectRoot\node_modules\.bin\cap.cmd")) {
  throw 'Run npm ci first to install the pinned Android packaging dependencies.'
}
$previousJava = $env:JAVA_HOME
Push-Location $projectRoot
try {
  $env:JAVA_HOME = $JdkPath
  node tools/prepare-android.cjs
  if ($LASTEXITCODE -ne 0) { throw 'Preparing web assets failed.' }
  & "$projectRoot\node_modules\.bin\cap.cmd" sync android
  if ($LASTEXITCODE -ne 0) { throw 'Capacitor sync failed.' }
  [IO.File]::WriteAllText("$projectRoot\android\local.properties", 'sdk.dir=' + $SdkPath.Replace('\', '/') + "`n")
  Push-Location "$projectRoot\android"
  try {
    & .\gradlew.bat assembleDebug --console=plain --no-daemon
    if ($LASTEXITCODE -ne 0) { throw 'Android Gradle build failed.' }
  } finally { Pop-Location }
  New-Item -ItemType Directory -Path "$projectRoot\builds" -Force | Out-Null
  Copy-Item -LiteralPath "$projectRoot\android\app\build\outputs\apk\debug\app-debug.apk" -Destination "$projectRoot\builds\TALA-debug.apk" -Force
  $metadata = Get-Content -LiteralPath "$projectRoot\android\app\build\outputs\apk\debug\output-metadata.json" -Raw | ConvertFrom-Json
  $buildVersion = $metadata.elements[0].versionName
  if ($buildVersion -match '^\d+(\.\d+)*$') {
    Copy-Item -LiteralPath "$projectRoot\builds\TALA-debug.apk" -Destination "$projectRoot\builds\TALA-$buildVersion-debug.apk" -Force
  }
  $apkFile = Get-Item -LiteralPath "$projectRoot\builds\TALA-debug.apk"
  Write-Output ("APK: " + $apkFile.FullName)
  Write-Output ("Size: " + $apkFile.Length + " bytes")
  Write-Output ("SHA256: " + (Get-FileHash -LiteralPath $apkFile.FullName -Algorithm SHA256).Hash)
} finally {
  $env:JAVA_HOME = $previousJava
  Pop-Location
}
