include $(TOPDIR)/rules.mk

PKG_NAME:=nbg7815_ble_init
PKG_VERSION:=1.0
PKG_RELEASE:=1

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/bluez/bluez.git
PKG_SOURCE_VERSION:=5.55
PKG_SOURCE_SUBDIR:=bluez-5.55
PKG_SOURCE:=bluez-5.55.tar.gz
PKG_HASH:=skip

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)/bluez-5.55

PKG_LICENSE:=GPL-2.0
PKG_MAINTAINER:=sinancetinkaya

include $(INCLUDE_DIR)/package.mk

define Package/nbg7815_ble_init
  SECTION:=Miscellaneous
  CATEGORY:=nbg7815
  TITLE:=PSKEY patches for NBG7815's CSR8811 Bluetooth chip
  DEPENDS:=+bluez-libs +bluez-utils
endef

define Package/nbg7815_ble_init/description
The NBG7815's CSR8811 BT chip requires PSKEY patches to be loaded at boot using bccmd.
This package is only needed for the Zyxel NBG7815. Do not install it on any other devices!
After installation, a reboot is required.
endef

define Build/Prepare
	$(call Build/Prepare/Default)
endef

define Build/Compile
	$(TARGET_CC) \
		$(TARGET_CFLAGS) \
		-I$(PKG_BUILD_DIR) \
		$(PKG_BUILD_DIR)/tools/bccmd.c \
		$(PKG_BUILD_DIR)/tools/csr.c \
		$(PKG_BUILD_DIR)/tools/csr_usb.c \
		$(PKG_BUILD_DIR)/tools/csr_hci.c \
		$(PKG_BUILD_DIR)/tools/csr_h4.c \
		$(PKG_BUILD_DIR)/tools/csr_bcsp.c \
		$(PKG_BUILD_DIR)/tools/csr_3wire.c \
		$(PKG_BUILD_DIR)/tools/ubcsp.c \
		-o $(PKG_BUILD_DIR)/bccmd \
		-lbluetooth
endef

define Package/nbg7815_ble_init/install
	# bccmd binary
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/bccmd $(1)/usr/bin/

	# CSR PSKEY files
	$(INSTALL_DIR) $(1)/etc/bluetooth
	$(INSTALL_DATA) ./files/csr8x11-a12-bt4.2-patch.psr $(1)/etc/bluetooth/
	$(INSTALL_DATA) ./files/csr8x11-coex.psr $(1)/etc/bluetooth/

	# init script
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/nbg7815_ble_init $(1)/etc/init.d/nbg7815_ble_init
endef

define Package/nbg7815_ble_init/prerm
	#!/bin/sh

	if [ -z "$${IPKG_INSTROOT}" ]; then
		# Remove generated BLE MAC PSR
		rm -f /etc/bluetooth/csr8x11-mac.psr
	fi

	exit 0
endef

$(eval $(call BuildPackage,nbg7815_ble_init))
