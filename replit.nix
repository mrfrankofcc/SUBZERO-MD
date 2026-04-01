{ pkgs }: {
    deps = [
        pkgs.sudo
        pkgs.nodejs_20
        pkgs.nodePackages.typescript
        pkgs.ffmpeg
        pkgs.imagemagick
        pkgs.git
        pkgs.neofetch
        pkgs.libwebp
        pkgs.vips
        pkgs.sqlite
        pkgs.speedtest-cli
        pkgs.wget
        pkgs.yarn
        pkgs.pm2
        pkgs.libuuid
    ];
    env = {
        LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.libuuid
            pkgs.vips
            pkgs.sqlite
        ];
    };
}
