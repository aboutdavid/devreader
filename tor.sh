touch /tmp/INSTALLED_PACKAGES
PACKAGES="libevent-2.0-5 tor"
if [ ! "$PACKAGES" == "$(cat /tmp/INSTALLED_PACKAGES)" ]; then
  cd /tmp
  rm -rf notroot
  git clone https://github.com/CrazyPython/notroot
  source notroot/bashrc
  notroot install $PACKAGES
  echo $PACKAGES > /tmp/INSTALLED_PACKAGES
else
  source /tmp/notroot/bashrc
fi
cd
mkdir .data 2>/dev/null
mkdir .data/hidden_service 2>/dev/null
chmod 700 .data/hidden_service/
tor